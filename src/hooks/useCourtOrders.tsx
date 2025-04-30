import { useEffect, useState } from "react";
import { CourtOrderWithPaymentDetailType } from "../lib/types";
import axiosClient from "../lib/axiosClient";

export function useCourtOrders() {
  const token = localStorage.getItem("token");

  const [courtOrders, setCourtOrders] = useState<
    CourtOrderWithPaymentDetailType[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourtOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get("/CourtOrder", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setCourtOrders(response.data.data);
      } else {
        throw response.data.message;
      }
    } catch (error) {
      setError("Error fetching court orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCourtOrders();
    }
  }, [token]);

  return {
    courtOrders,
    loading,
    error,
    refetch: fetchCourtOrders,
  };
}
