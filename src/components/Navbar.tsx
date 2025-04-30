import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MdMenu, MdClose } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-teal-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <h1 className="font-bold text-xl sm:text-2xl select-none">
          CourtRoom.
        </h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4">
          <NavButton label="Dashboard" onClick={() => navigate("/")} />
          <NavButton
            label="Court Orders"
            onClick={() => navigate("/courtOrders")}
          />
          <NavButton label="Payments" onClick={() => navigate("/payments")} />

          {role === "Admin" ? (
            <NavButton label="Users" onClick={() => navigate("/users")} />
          ) : (
            <></>
          )}
          <NavButton
            label="Change Password"
            onClick={() => navigate("/users/password")}
          />
          <NavButton label="Logout" onClick={handleLogout} />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-teal-700 text-white flex flex-col px-4 pb-4 space-y-2">
          <NavButton
            label="Dashboard"
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
          />
          <NavButton
            label="Court Orders"
            onClick={() => {
              navigate("/courtOrders");
              setMenuOpen(false);
            }}
          />
          <NavButton
            label="Payments"
            onClick={() => {
              navigate("/payments");
              setMenuOpen(false);
            }}
          />
          {role === "Admin" ? (
            <NavButton label="Users" onClick={() => navigate("/users")} />
          ) : (
            <></>
          )}
          <NavButton
            label="Change Password"
            onClick={() => navigate("/users/password")}
          />
          <NavButton
            label="Logout"
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
          />
        </div>
      )}
    </nav>
  );
};

const NavButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="px-3 py-2 rounded hover:bg-teal-500 transition text-sm font-medium"
  >
    {label}
  </button>
);

export default Navbar;
