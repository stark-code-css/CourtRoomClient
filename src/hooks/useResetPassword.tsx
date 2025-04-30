import { useState } from "react";
import axiosClient from "../lib/axiosClient";

function useResetPassword() {
  const [loading, setLoading] = useState(false);

  const resetPassword = async (id: number, email: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ You are not authorized. Please log in.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axiosClient.put(
        `/Auth/ResetPassword`,
        { Id: id, Email: email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        alert("✅ Password reset successfully!");
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      alert("❌ Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading };
}

export default useResetPassword;
