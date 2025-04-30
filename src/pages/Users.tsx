import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useUsers } from "../hooks/useUsers";
import useResetPassword from "../hooks/useResetPassword";

const Users = () => {
  const { error, users, loading, refetch } = useUsers();
  const { deleteUser } = useDeleteUser(refetch);
  const { resetPassword } = useResetPassword();

  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    let confirmation = confirm("Are you sure you want to delete this user?");
    if (!confirmation) return;
    deleteUser(id);
  };

  const handleResetPassword = (id: number, email: string) => {
    let confirmation = confirm(
      "Are you sure you want to reset this user's password?\nThe new password will be 12345678."
    );
    if (!confirmation) return;
    resetPassword(id, email);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">All Users</h1>

      <button
        onClick={() => navigate("/users/create")}
        className="bg-teal-500 rounded w-48 mb-6 p-2 text-white hover:bg-teal-600/80 transition"
      >
        Add new user
      </button>

      {loading ? (
        <p className="text-zinc-600">Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <table className="w-full text-sm text-center text-zinc-700">
            <thead className="bg-zinc-100 text-zinc-600">
              <tr>
                <th className="px-4 md:px-8 lg:px-12 py-2 border-b">User ID</th>
                <th className="px-4 md:px-8 lg:px-12 py-2 border-b">Name</th>
                <th className="px-4 md:px-8 lg:px-12 py-2 border-b">Email</th>
                <th className="px-4 md:px-8 lg:px-12 py-2 border-b">Role</th>
                <th className="px-4 md:px-8 lg:px-12 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-zinc-50 transition-colors duration-150"
                >
                  <td className="px-4 md:px-8 lg:px-12 py-2 border-b">
                    {user.id}
                  </td>
                  <td className="px-4 md:px-8 lg:px-12 py-2 border-b">
                    {user.name}
                  </td>
                  <td className="px-4 md:px-8 lg:px-12 py-2 border-b">
                    {user.email}
                  </td>
                  <td className="px-4 md:px-8 lg:px-12 py-2 border-b">
                    {user.role}
                  </td>
                  <td className="px-4 md:px-8 lg:px-12 py-2 border-b">
                    <div className="flex flex-col md:flex-row gap-2">
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleResetPassword(user.id, user.email)}
                      >
                        Reset Password
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          handleDelete(user.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default Users;
