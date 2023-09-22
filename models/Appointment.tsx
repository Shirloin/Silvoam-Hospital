import { Timestamp } from "firebase/firestore";
import { Patient } from "./Patient";
import { Bed, Room } from "./Room";
import { User } from "./User";

export interface Appointment {
    id: string;
    doctor: User;
    patient: Patient;
    bed: Bed;
    dateTime: Timestamp;
    queue: number;
    status: string;
    queueCategory: string;
    result: boolean;
}

export interface AppointmentProps{
    appointment: Appointment
}

export function AppointmentConstructor() {
    const appointment: Appointment = {
        id: "",
        doctor: {} as User,
        patient: {} as Patient,
        bed: {} as Bed,
        dateTime: Timestamp.now(),
        queue: 0,
        status: "",
        queueCategory: "",
        result: false
    }
    return appointment
}