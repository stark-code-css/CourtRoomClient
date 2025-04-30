export type paymentDetailsWithoutCourtOrderType = {
  costDeposited: number;
  dateOfCatBarLibFund: string;
  dateOfDeposit: string;
  id: number;
  paymentMode: string;
  paymentRefNo: string;
  receiptNo: string;
  remarks: string;
};

export type CourtOrderWithPaymentDetailType = {
  id: number;
  caseNo: string;
  courtNo: string;
  causeListSlNo: string;
  date: string;
  courtDirection: string;
  costImposed: number;
  imposedOn: string;
  cashWhereToBeDeposited: string;
  paymentDetail: paymentDetailsWithoutCourtOrderType | null;
};

export type paymentDetailsWithCourtOrderType = {
  id: number;
  costDeposited: number;
  dateOfCatBarLibFund: string;
  dateOfDeposit: string;
  paymentMode: string;
  paymentRefNo: string;
  receiptNo: string;
  remarks: string;
  courtOrder: {
    id: number;
    caseNo: string;
    courtNo: string;
    causeListSlNo: string;
    date: string;
    courtDirection: string;
    costImposed: number;
    imposedOn: string;
    cashWhereToBeDeposited: string;
  };
};

export type courtOrderWithoutPaymentDetailsType = {
  id: number;
  caseNo: string;
  courtNo: string;
  causeListSlNo: string;
  date: string;
  courtDirection: string;
  costImposed: number;
  imposedOn: string;
  cashWhereToBeDeposited: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  role: string;
};
