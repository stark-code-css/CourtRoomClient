import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import axiosClient from "../lib/axiosClient";
import { useNavigate, useParams } from "react-router";

const UpdateCourtOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [token] = useState(localStorage.getItem("token"));

  const [courtOrders, setCourtOrders] = useState({
    CourtNo: "",
    CaseNo: "",
    CauseListSlNo: "",
    Date: "",
    CourtDirection: "",
    CostImposed: "",
    ImposedOn: "Applicant",
    CashWhereToBeDeposited: "",
  });

  useEffect(() => {
    const fetchCourtOrder = async () => {
      try {
        const res = await axiosClient.get(`/CourtOrder/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          console.log(res.data.data);
          setCourtOrders({
            CourtNo: res.data.data.courtNo,
            CaseNo: res.data.data.caseNo,
            CauseListSlNo: res.data.data.causeListSlNo,
            Date: res.data.data.date.split("T")[0],
            CourtDirection: res.data.data.courtDirection,
            CostImposed: res.data.data.costImposed,
            ImposedOn: res.data.data.imposedOn,
            CashWhereToBeDeposited: res.data.data.cashWhereToBeDeposited,
          });
        }
      } catch (err) {
        console.error("Failed to fetch court order:", err);
      }
    };

    fetchCourtOrder();
  }, [id, token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourtOrders((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axiosClient.put(`/CourtOrder/${id}`, courtOrders, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        navigate("/courtOrders");
      } else {
        throw res.data.message;
      }
    } catch (err) {
      console.error("Error updating court order:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 via-white to-gray-100 px-4">
      <form className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg space-y-5">
        <h1 className="text-2xl font-bold text-zinc-800 mb-2">
          Update Court Order
        </h1>

        <div>
          <Label className="text-sm text-zinc-700">Court No</Label>
          <Input
            name="CourtNo"
            value={courtOrders.CourtNo}
            onChange={handleChange}
            className="rounded-lg mt-1"
          />
        </div>

        <div>
          <Label className="text-sm text-zinc-700">Case No</Label>
          <Input
            name="CaseNo"
            value={courtOrders.CaseNo}
            onChange={handleChange}
            className="rounded-lg mt-1"
          />
        </div>

        <div>
          <Label className="text-sm text-zinc-700">Cause List Sl No</Label>
          <Input
            name="CauseListSlNo"
            value={courtOrders.CauseListSlNo}
            onChange={handleChange}
            className="rounded-lg mt-1"
          />
        </div>

        <div>
          <Label className="text-sm text-zinc-700">Date</Label>
          <Input
            name="Date"
            type="date"
            value={courtOrders.Date}
            onChange={handleChange}
            className="rounded-lg mt-1"
          />
        </div>

        <div>
          <Label className="text-sm text-zinc-700">Court Direction</Label>
          <Textarea
            name="CourtDirection"
            value={courtOrders.CourtDirection}
            onChange={handleChange}
            className="rounded-lg mt-1"
          />
        </div>

        <div>
          <Label className="text-sm text-zinc-700">Cost Imposed</Label>
          <Input
            name="CostImposed"
            value={courtOrders.CostImposed}
            onChange={handleChange}
            className="rounded-lg mt-1"
          />
        </div>

        <div>
          <Label className="text-sm text-zinc-700">Imposed On</Label>
          <div className="flex items-center space-x-6 mt-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="ImposedOn"
                value="Applicant"
                checked={courtOrders.ImposedOn === "Applicant"}
                onChange={handleChange}
              />
              <span className="text-sm text-zinc-700">Applicant</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="ImposedOn"
                value="Respondent"
                checked={courtOrders.ImposedOn === "Respondent"}
                onChange={handleChange}
              />
              <span className="text-sm text-zinc-700">Respondent</span>
            </label>
          </div>
        </div>

        <div>
          <Label className="text-sm text-zinc-700">
            Cash Where to be Deposited
          </Label>
          <Input
            name="CashWhereToBeDeposited"
            value={courtOrders.CashWhereToBeDeposited}
            onChange={handleChange}
            className="rounded-lg mt-1"
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSubmit}
            className="rounded-lg bg-teal-600 hover:bg-teal-700"
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCourtOrder;
