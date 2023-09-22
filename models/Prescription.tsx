import { Medicine } from "./Medicine";
import { Patient } from "./Patient";
import { Room } from "./Room";
import { User } from "./User";

export interface Prescription {
    id: string;
    patient: Patient;
    status: string;
    medicines: Medicine[];
    room: Room;
    note: string;
}

export interface PrescriptionProps {
    prescription: Prescription;
}

export function PrescriptionConstructor() {
    const prescription: Prescription = {
        id: "",
        patient: {} as Patient,
        status: "Queued",
        medicines: [] as Medicine[],
        room: {} as Room,
        note: ""
    }
    return prescription
}