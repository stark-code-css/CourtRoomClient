import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import axiosClient from "../lib/axiosClient";
import { useNavigate, useParams } from "react-router";

const CreatePayment = () => {
  const navigate = useNavigate();
  const { courtOrderId } = useParams();

  const [form, setForm] = useState({
    costDeposited: "",
    paymentMode: "Online",
    paymentRefNo: "",
    dateOfDeposit: "",
    receiptNo: "",
    dateOfCatBarLibFund: "",
    remarks: "",
    courtOrderId: courtOrderId || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    setLoading(true);
    setError("");

    try {
      const response = await axiosClient.post(
        "/PaymentDetail",
        {
          CostDeposited: parseFloat(form.costDeposited),
          PaymentMode: form.paymentMode,
          PaymentRefNo: form.paymentRefNo,
          DateOfDeposit: form.dateOfDeposit,
          ReceiptNo: form.receiptNo,
          DateOfCatBarLibFund: form.dateOfCatBarLibFund,
          Remarks: form.remarks,
          CourtOrderId: parseInt(form.courtOrderId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        navigate("/payments");
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(
        "Error creating payment. Please verify court order ID, or try again later."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 via-white to-gray-100 px-4">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-zinc-800 mb-2">
          Create Payment
        </h1>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div>
          <Label className="text-sm text-zinc-700">Court Order ID</Label>
          <Input
            name="courtOrderId"
            value={form.courtOrderId}
            onChange={handleChange}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label className="text-sm text-zinc-700">Cost Deposited</Label>
          <Input
            type="number"
            name="costDeposited"
            min={0}
            step={0.01}
            value={form.costDeposited}
            onChange={handleChange}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label className="text-sm text-zinc-700">Date of Deposit</Label>
          <Input
            type="date"
            name="dateOfDeposit"
            value={form.dateOfDeposit}
            onChange={handleChange}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label className="text-sm text-zinc-700">
            Date of CAT Bar/Library Fund
          </Label>
          <Input
            type="date"
            name="dateOfCatBarLibFund"
            value={form.dateOfCatBarLibFund}
            onChange={handleChange}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label className="text-sm text-zinc-700">Payment Mode</Label>
          <select
            name="paymentMode"
            value={form.paymentMode}
            onChange={handleChange}
            className="w-full mt-1 border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-700"
            required
          >
            <option value="Online">Online</option>
            <option value="Cash">Cash</option>
            <option value="Cheque">Cheque</option>
          </select>
        </div>

        <div>
          <Label className="text-sm text-zinc-700">Payment Reference No</Label>
          <Input
            name="paymentRefNo"
            value={form.paymentRefNo}
            onChange={handleChange}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label className="text-sm text-zinc-700">Receipt No</Label>
          <Input
            name="receiptNo"
            value={form.receiptNo}
            onChange={handleChange}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label className="text-sm text-zinc-700">Remarks</Label>
          <Textarea
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
          >
            {loading ? "Submitting..." : "Create Payment"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePayment;
