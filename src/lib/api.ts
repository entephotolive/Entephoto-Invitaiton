import axios from 'axios';

// Configure the base axios instance
const api = axios.create({
  // Use the NEXT_PUBLIC_API_URL from environment variables or fallback to the provided URL
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://invitation-api-x8zb.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Create Invitation (POST /api/invitations)
// Accepts brideName, groomName, coverPhoto, weddingDate, etc.
export const createInvitation = async (data: any) => {
  try {
    console.log("SENDING PAYLOAD:", data);

    const response = await api.post("/api/invitations", data);

    console.log("SUCCESS:", response.data);

    return response.data;
  } catch (error: any) {
    console.log("STATUS:", error.response?.status);
    console.log("BACKEND DATA:", JSON.stringify(error.response?.data, null, 2));
    alert(JSON.stringify(error.response?.data, null, 2));
    throw error;
  }
};

// 2. Get All Invitations (GET /api/invitations?page=1&limit=10)
export const getAllInvitations = async (page: number = 1, limit: number = 10) => {
  const response = await api.get(`/api/invitations?page=${page}&limit=${limit}`);
  return response.data;
};

// 3. Get Single Invitation (GET /api/invitations/[identifier])
// identifier can be either the MongoDB _id or the SEO slug
export const getSingleInvitation = async (identifier: string) => {
  const response = await api.get(`/api/invitations/${identifier}`);
  return response.data;
};

// 4. Update Invitation (PUT /api/invitations/[identifier])
// Accepts partial data to update an existing invitation
export const updateInvitation = async (identifier: string, data: any) => {
  const response = await api.put(`/api/invitations/${identifier}`, data);
  return response.data;
};

// 5. Delete Invitation (DELETE /api/invitations/[identifier])
// Deletes an invitation by its _id or slug
export const deleteInvitation = async (identifier: string) => {
  const response = await api.delete(`/api/invitations/${identifier}`);
  return response.data;
};

export default api;