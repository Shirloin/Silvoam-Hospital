import { Timestamp } from "firebase/firestore";
import { Patient } from "./Patient";

export interface Room {
    id: string;
    number: string;
    type: string;
    capacity: number;
    price: number;
    bed: number;
    beds: Bed[]
}

export interface RoomProps {
    room: Room
}

export interface Bed {
    id: string;
    number: string;
    status: string;
    patient: Patient;
    doctor: string;
    sickness: string;
    useDate: Timestamp | null;
}

export interface BedProps {
    bed: Bed
}

export interface BedsProps {
    bed: Bed[]
}
export function BedConstructor(roomNumber:string) {
    const bed: Bed = {
        id: "",
        status: "green",
        number: roomNumber,
        patient: {} as Patient,
        doctor: "",
        sickness: "",
        useDate: null
    }
    return bed
}