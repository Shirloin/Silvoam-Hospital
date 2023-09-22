import { Timestamp } from "firebase/firestore";
import { Patient } from "./Patient";
import { User } from "./User";

export interface Bill {
    id: string;
    date: Timestamp | null;
    patient: Patient;
    staff: User;
    paymentDate: Timestamp | null;
    items: { [key: string]: any };
    total: number | Float32Array;
    dayIncreases: number;
}

export interface BillProps {
    bill: Bill
}

export function BillConstructor() {
    const bill: Bill = {
        id: "",
        date: null,
        patient: {} as Patient,
        staff: {} as User,
        paymentDate: null,
        items: [],
        total: 0,
        dayIncreases: 0
    }
    return bill
}