import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};
export default HomeLayout;
