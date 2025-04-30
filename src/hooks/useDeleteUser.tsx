import axiosClient from "../lib/axiosClient";

export function useDeleteUser(onSuccess: () => void) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const deleteUser = async (id: number) => {
    console.log(token);
    if (!token) {
      alert("No token found");
      return;
    }
    if (role !== "Admin") {
      alert("You are not authorized to delete users");
      return;
    }

    try {
      const response = await axiosClient.delete(`/Auth/${id}`, {
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

  return { deleteUser };
}
