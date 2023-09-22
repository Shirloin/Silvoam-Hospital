import { Timestamp } from "firebase/firestore";

export interface Patient{
    id:string;
    name:string;
    phone:string;
    gender:string;
    dob:Timestamp;
    email:string;
    address:string;
}

export interface PatientProps{
    patient: Patient
}
