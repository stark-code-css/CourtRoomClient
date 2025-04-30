import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { usePaymentDetails } from "../hooks/usePayments";
import { courtOrderWithoutPaymentDetailsType } from "../lib/types";
import ShowCourtOrder from "../components/ShowCourtOrder";
import { useNavigate } from "react-router";
import { useDeletePayment } from "../hooks/useDeletePayment";

const tableHeaders = [
  "ID",
  "Case Number",
  "Cost Deposited",
  "Date of Deposit",
  "Date of CAT/Bar/Lib Fund",
  "Payment Mode",
  "Payment Ref No",
  "Receipt No",
  "Remarks",
];

const PaymentsPage = () => {
  const role = localStorage.getItem("role");
  if (role === "Admin" && tableHeaders.at(-1) !== "Actions") {
    tableHeaders.push("Actions");
  } else if (role !== "Admin" && tableHeaders.at(-1) === "Actions") {
    tableHeaders.pop();
  }

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const { payments, loading, error, refetch } = usePaymentDetails();

  const [openCourtOrder, setOpenCourtOrder] = useState(false);
  const [courtOrderData, setCourtOrderData] =
    useState<courtOrderWithoutPaymentDetailsType | null>(null);

  const { deletePayment } = useDeletePayment(refetch);

  const handleCourtOrderClick = (
    courtOrder: courtOrderWithoutPaymentDetailsType
  ) => {
    setCourtOrderData(courtOrder);
    setOpenCourtOrder(true);
  };

  const filteredPayments = payments.filter((payment) =>
    payment.courtOrder.caseNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col px-4 lg:px-16 py-8 min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100">
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">All Payments</h1>

      {role === "Admin" || role === "Cashier" ? (
        <button
          onClick={() => navigate("/payments/create")}
          className="bg-teal-500 rounded w-48 mb-6 p-2 text-white hover:bg-teal-600/80 transition"
        >
          Add new payment
        </button>
      ) : null}

      {/* 🔍 Search */}
      <div className="mb-6 w-full max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 z-10 flex items-center">
            <HiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by case no..."
            className="w-full pl-10 pr-4 py-2 bg-white/70 backdrop-blur-md border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none text-sm placeholder:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 🌀 Loading and Error */}
      {loading && (
        <p className="text-center text-teal-500 text-sm mb-4 animate-pulse">
          Loading payments...
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
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 border">{payment.id}</td>
                <td className="px-4 py-3 border">
                  <button
                    className="text-teal-500 underline cursor-pointer hover:text-teal-600"
                    onClick={() => handleCourtOrderClick(payment.courtOrder)}
                  >
                    {payment.courtOrder.caseNo}
                  </button>
                </td>
                <td className="px-4 py-3 border">
                  ₹{payment.costDeposited.toLocaleString()}
                </td>
                <td className="px-4 py-3 border">
                  {new Date(payment.dateOfDeposit).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 border">
                  {new Date(payment.dateOfCatBarLibFund).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 border">{payment.paymentMode}</td>
                <td className="px-4 py-3 border">{payment.paymentRefNo}</td>
                <td className="px-4 py-3 border">{payment.receiptNo}</td>
                <td className="px-4 py-3 border">{payment.remarks}</td>
                {role === "Admin" && (
                  <td className="px-4 py-3 border">
                    <div className="flex flex-col gap-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm rounded px-3 py-1"
                        onClick={() => navigate(`/payments/edit/${payment.id}`)}
                      >
                        Edit Payment Detail
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white text-sm rounded px-3 py-1"
                        onClick={() => deletePayment(payment.id)}
                      >
                        Delete Payment Detail
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}

            {filteredPayments.length === 0 && (
              <tr>
                <td
                  colSpan={tableHeaders.length}
                  className="text-center text-sm py-6 text-gray-500"
                >
                  No matching payment records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ShowCourtOrder
        open={openCourtOrder}
        onOpenChange={setOpenCourtOrder}
        data={courtOrderData}
      />
    </div>
  );
};

export default PaymentsPage;
