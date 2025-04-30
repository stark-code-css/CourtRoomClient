import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";

import { paymentDetailsWithoutCourtOrderType } from "../lib/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: paymentDetailsWithoutCourtOrderType | null;
}

const ShowPaymentDetails = ({ open, onOpenChange, data }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-white rounded-xl shadow-2xl p-6 space-y-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Payment Details
          </DialogTitle>
          <DialogDescription>
            Detailed breakdown of this court order's payment.
          </DialogDescription>
        </DialogHeader>

        {data ? (
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-medium">Cost Deposited:</span> ₹
              {data.costDeposited}
            </p>
            <p>
              <span className="font-medium">Date of Deposit:</span>{" "}
              {new Date(data.dateOfDeposit).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Date of Cat Bar Library Fund:</span>{" "}
              {new Date(data.dateOfCatBarLibFund).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Payment Mode:</span>{" "}
              {data.paymentMode}
            </p>
            <p>
              <span className="font-medium">Payment Reference No:</span>{" "}
              {data.paymentRefNo}
            </p>
            <p>
              <span className="font-medium">Receipt No:</span> {data.receiptNo}
            </p>
            <p>
              <span className="font-medium">Remarks:</span> {data.remarks}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 italic">No payment details available.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShowPaymentDetails;
