import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";

import { courtOrderWithoutPaymentDetailsType } from "../lib/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: courtOrderWithoutPaymentDetailsType | null;
}

const ShowCourtOrder = ({ open, onOpenChange, data }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-white rounded-xl shadow-2xl p-6 space-y-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Court Order Details
          </DialogTitle>
          <DialogDescription>
            Full details of this court order.
          </DialogDescription>
        </DialogHeader>

        {data ? (
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-medium">Court No:</span> {data.courtNo}
            </p>
            <p>
              <span className="font-medium">Case No:</span> {data.caseNo}
            </p>
            <p>
              <span className="font-medium">Cause List Sl. No:</span>{" "}
              {data.causeListSlNo}
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {new Date(data.date).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Court Direction:</span>{" "}
              {data.courtDirection}
            </p>
            <p>
              <span className="font-medium">Cost Imposed:</span> ₹
              {data.costImposed.toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Imposed On:</span> {data.imposedOn}
            </p>
            <p>
              <span className="font-medium">Cash Where to be Deposited:</span>{" "}
              {data.cashWhereToBeDeposited}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 italic">
            No court order details available.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShowCourtOrder;
