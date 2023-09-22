import { Patient } from "./Patient";
import { User } from "./User";

export interface Ambulance {
    id: string;
    number: string;
    year: number;
    type: string;
    status: string;
    description: string;
}

export interface AmbulanceProps {
    ambulance: Ambulance
}

export interface UsedAmbulance{
    id: string;
    ambulance: Ambulance;
    patient: Patient;
    destination: string;
    driver: User;
}

export interface UsedAmbulanceProps{
    usedAmbulance: UsedAmbulance
}

export function AmbulanceConstructor() {
    const ambulance: Ambulance = {
        id: "",
        number: "",
        year: 0,
        type: "Type",
        status: "Available",
        description: ""
    }
    return ambulance
}

export function UsedAmbulanceConstructor(){
    const usedAmbulance: UsedAmbulance = {
        id: "",
        ambulance: {} as Ambulance,
        patient: {} as Patient,
        destination: "",
        driver: {} as User
    }
    return usedAmbulance
}
