"use server";

import { OAuth2Client } from "google-auth-library";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { createSession, verifySession, deleteSession } from "@/lib/session";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function googleSignInAction(credential: string) {
  try {
    if (!credential) {
      return { success: false, error: "Missing credential" };
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return { success: false, error: "Invalid token payload" };
    }

    const { sub, email, name, picture, email_verified } = payload;

    if (!email_verified) {
      return { success: false, error: "Email not verified by Google" };
    }

    await connectDB();

    let user = await User.findOne({
      $or: [{ googleId: sub }, { email }],
    });

    if (!user) {
      user = await User.create({
        googleId: sub,
        email,
        name,
        picture,
        emailVerified: email_verified,
      });
    } else if (!user.googleId) {
      user.googleId = sub;
      user.picture = user.picture || picture;
      await user.save();
    }

    await createSession(sub, email || "", name || "");

    return {
      success: true,
      user: {
        id: sub,
        email,
        name,
        picture,
      },
    };
  } catch (error) {
    console.error("Error verifying Google ID token:", error);
    return { success: false, error: "Authentication failed" };
  }
}

export async function getCurrentUserAction() {
  try {
    const session = await verifySession();
    if (!session) {
      return { success: false, error: "Not authenticated" };
    }

    await connectDB();
    const user = await User.findOne({ googleId: session.userId }).lean();

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return JSON.parse(
      JSON.stringify({
        success: true,
        user: {
          id: user.googleId,
          email: user.email,
          name: user.name,
          picture: user.picture,
        },
      })
    );
  } catch (error) {
    console.error("Failed to get user:", error);
    return { success: false, error: "Authentication failed" };
  }
}

export async function logoutAction() {
  await deleteSession();
  return { success: true, message: "Logged out successfully" };
}
