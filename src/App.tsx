import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HomeLayout from "./layouts/HomeLayout";
import CourtOrders from "./pages/CourtOrders";
import Payments from "./pages/Payments";
import CreateCourtOrder from "./pages/CreateCourtOrder";
import CreatePayment from "./pages/CreatePayement";
import Users from "./pages/Users";
import UpdatePayment from "./pages/UpdatePayment";
import UpdateCourtOrder from "./pages/UpdateCourtOrder";
import CreateUser from "./pages/CreateUser";
import ChangePassword from "./pages/ChangePassword";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="/courtOrders" element={<CourtOrders />} />
          <Route path="/courtOrders/create" element={<CreateCourtOrder />} />
          <Route path="/courtOrders/edit/:id" element={<UpdateCourtOrder />} />

          <Route path="/payments" element={<Payments />} />
          <Route path="/payments/create" element={<CreatePayment />} />
          <Route path="/payments/edit/:id" element={<UpdatePayment />} />
          <Route
            path="/payments/create/:courtOrderId"
            element={<CreatePayment />}
          />

          <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
