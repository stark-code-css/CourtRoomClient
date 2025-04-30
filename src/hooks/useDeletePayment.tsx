import axiosClient from "../lib/axiosClient";

export function useDeletePayment(onSuccess: () => void) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const deletePayment = async (id: number) => {
    console.log(token);
    if (!token) {
      alert("No token found");
      return;
    }
    if (role !== "Admin") {
      alert("You are not authorized to delete payments");
      return;
    }

    try {
      const response = await axiosClient.delete(`/PaymentDetail/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        onSuccess();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting payment:", error);
      alert("Error deleting payment");
    }
  };

  return { deletePayment };
}
