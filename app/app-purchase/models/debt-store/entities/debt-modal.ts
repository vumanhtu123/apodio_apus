interface RootObject {
    message: string;
    traceId: string;
    data: DataTotal;
}

export interface DataTotal {
    totalPartner: number;
    debtAmount?: any;
}
