import { useEffect, useState } from "react";
import axiosClient from "../lib/axiosClient";
import { UserType } from "../lib/types";

export const useUsers = () => {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await axiosClient.get("/Auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      } else {
        throw res.data.message;
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, refetch: fetchUsers };
};
