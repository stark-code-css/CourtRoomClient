import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Label } from "@radix-ui/react-label";
import axiosClient from "../lib/axiosClient";

const UpdatePayment = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    costDeposited: "",
    dateOfDeposit: "",
    dateOfCatBarLibFund: "",
    paymentMode: "Online",
    paymentRefNo: "",
    receiptNo: "",
    remarks: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/PaymentDetail/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setForm({
          costDeposited: response.data.data.costDeposited,
          dateOfDeposit: response.data.data.dateOfDeposit.split("T")[0],
          dateOfCatBarLibFund:
            response.data.data.dateOfCatBarLibFund.split("T")[0],
          paymentMode: response.data.data.paymentMode,
          paymentRefNo: response.data.data.paymentRefNo,
          receiptNo: response.data.data.receiptNo,
          remarks: response.data.data.remarks,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch payment details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPaymentDetails();
    }
  }, [id, token]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axiosClient.put(
        `/PaymentDetail/${id}`,
        {
          ...form,
          dateOfDeposit: new Date(form.dateOfDeposit).toISOString(),
          dateOfCatBarLibFund: new Date(form.dateOfCatBarLibFund).toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/payments");
      } else {
        throw response.data.message;
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 via-white to-gray-100 px-4">
      <form
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg space-y-5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-zinc-800 mb-2">
          Update Payment
        </h2>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div>
          <Label className="text-sm text-zinc-700">Cost Deposited</Label>
          <Input
            type="number"
            step={0.01}
            name="costDeposited"
            value={form.costDeposited}
            onChange={handleChange}
            min={0}
            className="rounded-lg mt-1"
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
            className="rounded-lg mt-1"
            required
          />
        </div>

        <div>
          <Label className="text-sm text-zinc-700">
            Date of Cat Bar Lib Fund
          </Label>
          <Input
            type="date"
            name="dateOfCatBarLibFund"
            value={form.dateOfCatBarLibFund}
            onChange={handleChange}
            className="rounded-lg mt-1"
            required
          />
        </div>

        <div>
          <Label className="text-sm text-zinc-700">Payment Mode</Label>
          <select
            name="paymentMode"
            value={form.paymentMode}
            onChange={handleChange}
            className="rounded-lg w-full border px-3 py-2 mt-1"
            required
          >
            <option value="Online">Online</option>
            <option value="Cash">Cash</option>
            <option value="Cheque">Cheque</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        <div>
          <Label className="text-sm text-zinc-700">Payment Reference No</Label>
          <Input
            name="paymentRefNo"
            value={form.paymentRefNo}
            onChange={handleChange}
            className="rounded-lg mt-1"
            required
          />
        </div>

        <div>
          <Label className="text-sm text-zinc-700">Receipt No</Label>
          <Input
            name="receiptNo"
            value={form.receiptNo}
            onChange={handleChange}
            className="rounded-lg mt-1"
            required
          />
        </div>

        <div>
          <Label className="text-sm text-zinc-700">Remarks</Label>
          <Textarea
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            className="rounded-lg mt-1"
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="rounded-lg bg-teal-600 hover:bg-teal-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Payment"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePayment;
