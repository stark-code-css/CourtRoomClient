import { useState } from "react";
import { useNavigate } from "react-router";
import ShowPaymentDetails from "../components/ShowPaymentDetails";
import { useCourtOrders } from "../hooks/useCourtOrders";
import { useDeleteCourtOrder } from "../hooks/useDeleteCourtOrder";
import { HiSearch } from "react-icons/hi";

const tableHeaders = [
  "ID",
  "Case No",
  "Court No",
  "Cause List Sl No",
  "Date",
  "Court Direction",
  "Cost Imposed",
  "Imposed On",
  "Deposit Location",
  "Payment Details",
];

const CourtOrdersPage = () => {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  if (role === "Admin" && tableHeaders.at(-1) !== "Actions") {
    tableHeaders.push("Actions");
  } else if (role !== "Admin" && tableHeaders.at(-1) === "Actions") {
    tableHeaders.pop();
  }

  const [openPayment, setOpenPayment] = useState(false);
  const [paymentDetail, setPaymentDetail] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { courtOrders, loading, error, refetch } = useCourtOrders();
  const { deleteCourtOrder } = useDeleteCourtOrder(refetch);

  const filteredOrders = courtOrders.filter((order) =>
    order.caseNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowPaymentDetails = (paymentData: any) => {
    setPaymentDetail(paymentData);
    setOpenPayment(true);
  };

  return (
    <div className="flex flex-col px-4 lg:px-16 py-8 min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100">
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">
        All Court Orders
      </h1>

      {role === "Admin" || role === "CourtMaster" ? (
        <button
          onClick={() => navigate("/courtOrders/create")}
          className="bg-teal-500 rounded w-48 mb-6 p-2 text-white hover:bg-teal-600/80 transition"
        >
          Add new court order
        </button>
      ) : null}

      {/* 🔍 Styled Search Bar with react-icons */}
      <div className="mb-6 w-full max-w-md">
        <div className="relative">
          {/* Icon wrapper */}
          <div className="absolute inset-y-0 left-0 pl-3 z-10 flex items-center">
            <HiSearch className="text-gray-400" />
          </div>

          <input
            type="text"
            placeholder="Search by case number..."
            className="w-full pl-10 pr-4 py-2 bg-white/70 backdrop-blur-md border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none text-sm placeholder:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 🌀 Loading and Error */}
      {loading && (
        <p className="text-center text-teal-500 text-sm mb-4 animate-pulse">
          Loading court orders...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 text-sm mb-4">Error: {error}</p>
      )}

      {/* 🧾 Table */}
      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {tableHeaders.map((header, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredOrders.map((courtOrder) => (
              <tr key={courtOrder.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 border">{courtOrder.id}</td>
                <td className="px-4 py-3 border">{courtOrder.caseNo}</td>
                <td className="px-4 py-3 border">{courtOrder.courtNo}</td>
                <td className="px-4 py-3 border">{courtOrder.causeListSlNo}</td>
                <td className="px-4 py-3 border">
                  {new Date(courtOrder.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 border">
                  {courtOrder.courtDirection}
                </td>
                <td className="px-4 py-3 border">
                  ₹{courtOrder.costImposed.toLocaleString()}
                </td>
                <td className="px-4 py-3 border">{courtOrder.imposedOn}</td>
                <td className="px-4 py-3 border">
                  {courtOrder.cashWhereToBeDeposited}
                </td>
                <td className="px-4 py-3 border">
                  <div className="flex flex-col gap-2">
                    <button
                      className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                        courtOrder.paymentDetail
                          ? "bg-teal-500 hover:bg-teal-600 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      onClick={() => {
                        if (courtOrder.paymentDetail) {
                          handleShowPaymentDetails(courtOrder.paymentDetail);
                        }
                      }}
                      disabled={!courtOrder.paymentDetail}
                    >
                      Show Payment Details
                    </button>

                    {role === "Admin" || role === "Cashier" ? (
                      <button
                        className={`text-sm rounded px-3 py-1 ${
                          courtOrder.paymentDetail == null
                            ? "bg-blue-500 hover:bg-blue-600 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        disabled={
                          courtOrder.paymentDetail == null ? false : true
                        }
                        onClick={() => {
                          navigate(`/payments/create/${courtOrder.id}`);
                        }}
                      >
                        Add Payment Details
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </td>
                {role === "Admin" && (
                  <td className="px-4 py-3 border">
                    <div className="flex flex-col gap-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm rounded px-3 py-1"
                        onClick={() =>
                          navigate(`/courtOrders/edit/${courtOrder.id}`)
                        }
                      >
                        Edit Court Order
                      </button>
                      <button
                        onClick={() => deleteCourtOrder(courtOrder.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm rounded px-3 py-1"
                      >
                        Delete Court Order
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td
                  colSpan={12}
                  className="text-center text-sm py-6 text-gray-500"
                >
                  No matching court orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 👁 Payment Details Dialog */}
      <ShowPaymentDetails
        open={openPayment}
        data={paymentDetail}
        onOpenChange={setOpenPayment}
      />
    </div>
  );
};

export default CourtOrdersPage;
