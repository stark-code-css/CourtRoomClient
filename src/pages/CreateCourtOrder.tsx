import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { useState } from "react";
import axiosClient from "../lib/axiosClient";
import { useNavigate } from "react-router";

const CreateCourtOrder = () => {
  const navigate = useNavigate();
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourtOrders((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReset = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCourtOrders({
      CourtNo: "",
      CaseNo: "",
      CauseListSlNo: "",
      Date: "",
      CourtDirection: "",
      CostImposed: "",
      ImposedOn: "Applicant",
      CashWhereToBeDeposited: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/CourtOrder", courtOrders, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        navigate("/courtOrders");
      } else {
        throw response.data.message;
      }
    } catch (error) {
      console.log("Error creating court order:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 via-white to-gray-100 px-4">
      <form className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg space-y-5">
        <h1 className="text-2xl font-bold text-zinc-800 mb-2">
          Create New Court Order
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
            value={courtOrders.Date}
            type="date"
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
            type="number"
            min={0}
            step={0.01}
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
                id="Applicant"
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
                id="Respondent"
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

        <div className="flex justify-between pt-4">
          <Button
            onClick={handleSubmit}
            className="rounded-lg bg-teal-600 hover:bg-teal-700"
          >
            Submit
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="rounded-lg"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourtOrder;
