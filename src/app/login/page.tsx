"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { googleSignInAction } from "@/lib/actions/auth";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      setLoading(true);
      setError("");

      const credential = credentialResponse.credential;
      if (!credential) {
        throw new Error("Google authentication failed. No credential received.");
      }

      const res = await googleSignInAction(credential);
      
      if (!res.success) {
        throw new Error(res.error || "Authentication failed.");
      }
      
      router.push("/");
    } catch (err: any) {
      const message = err instanceof Error ? err.message : "Authentication failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setLoading(false);
    setError("Authentication popup was blocked by your browser. Please disable your popup blocker or use a different browser to sign in.");
  };

  return (
      <main
        className="relative min-h-screen overflow-hidden bg-[#17110d] px-5 py-8 font-sans text-white sm:px-8"
      >
        <Image
          src="/login/papperbackgoround.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,12,8,0.78),rgba(18,12,8,0.42),rgba(18,12,8,0.72))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.2),transparent_34%)]" />

        <section className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_440px]">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-xl text-white mb-4 lg:mb-0">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                Digital invitations
              </p>
              <h1
                className="text-6xl font-semibold leading-[0.95] text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                EnteInvitation
              </h1>
              <p className="mt-4 lg:mt-5 max-w-md text-sm lg:text-base leading-6 lg:leading-7 text-white/76 hidden sm:block">
                A refined place to open, manage, and share your celebration
                moments with a secure Google account.
              </p>
            </div>

            <div className="mx-auto w-full max-w-[440px] rounded-[28px] border border-white/24 bg-white/16 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:p-8">
              <div className="rounded-[22px] border border-white/22 bg-white/[0.13] px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.24)] sm:px-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border border-white/24 bg-white/18 shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-md">
                    <Image
                      src="/login/logo.png"
                      alt="EnteInvitation logo"
                      width={72}
                      height={72}
                      priority
                      className="h-16 w-16 object-contain"
                    />
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/68">
                    Welcome to
                  </p>
                  <h2
                    className="mt-2 text-4xl font-semibold leading-none text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    EnteInvitation
                  </h2>
                  <p className="mt-4 max-w-[310px] text-sm leading-6 text-white/72">
                    Sign in to access your personal invitation dashboard.
                  </p>
                </div>

                {error ? (
                  <div className="mt-7 rounded-2xl border border-red-200/35 bg-red-950/30 px-4 py-3 text-center text-sm text-red-50">
                    {error}
                  </div>
                ) : null}

                <div className="mt-8 flex min-h-14 items-center justify-center">
                  {loading ? (
                    <div className="flex items-center gap-3 rounded-full border border-white/18 bg-white/14 px-5 py-3 text-sm font-medium text-white/80">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/28 border-t-white" />
                      Signing you in
                    </div>
                  ) : (
                    <div className="w-full flex justify-center hover:-translate-y-0.5 transition duration-200">
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        theme="outline"
                        size="large"
                        shape="pill"
                        text="continue_with"
                        use_fedcm_for_prompt={true}
                      />
                    </div>
                  )}
                </div>

                <p className="mx-auto mt-6 max-w-[300px] text-center text-xs leading-5 text-white/56">
                  Protected by Google sign-in. We only use your account to
                  verify access to your invitation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}
