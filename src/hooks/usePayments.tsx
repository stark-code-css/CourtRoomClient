import { useEffect, useState } from "react";
import axiosClient from "../lib/axiosClient";
import { paymentDetailsWithCourtOrderType } from "../lib/types";

export const usePaymentDetails = () => {
  const token = localStorage.getItem("token");

  const [payments, setPayments] = useState<paymentDetailsWithCourtOrderType[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = async () => {
    try {
      const res = await axiosClient.get("/PaymentDetail", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setPayments(res.data.data);
      } else {
        throw res.data.message;
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return { payments, loading, error, refetch: fetchPayments };
};
