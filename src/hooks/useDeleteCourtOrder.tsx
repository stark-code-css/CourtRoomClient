import axiosClient from "../lib/axiosClient";

export function useDeleteCourtOrder(onSuccess: () => void) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const deleteCourtOrder = async (id: number) => {
    if (!token) {
      alert("No token found");
      return;
    }

    if (role != "Admin") {
      alert("Unauthorized role");
      return;
    }

    try {
      const response = await axiosClient.delete(`/CourtOrder/${id}`, {
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
    } catch (err) {
      console.error("Error deleting court order:", err);
      alert("Error deleting court order");
    }
  };

  return { deleteCourtOrder };
}
