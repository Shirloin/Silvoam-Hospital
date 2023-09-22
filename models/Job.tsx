import { Timestamp } from "firebase/firestore";
import { Ambulance } from "./Ambulance";
import { Patient, PatientProps } from "./Patient";
import { Room } from "./Room";
import { User } from "./User";

export interface Job{
    id: string;
    status: string;
    name: string;
    category: string;
    patient: Patient;
    assignedDate: Timestamp;
    dueDate: Timestamp;
    room: Room;
    userid: string;
    newRoom: string;
    bed:string;
    ambulance: Ambulance
}

export interface JobProps{
    job: Job;
}

export function JobConstructor(name: string, category: string, patient: Patient, dueDate: Timestamp, room: Room, userid: string, newRoom: string, bed: string, ambulance:Ambulance){
    const job: Job = {
        id: "",
        status: "Unfinished",
        name: name,
        category: category,
        patient: patient,
        assignedDate: Timestamp.now(),
        dueDate: dueDate,
        room: room,
        userid: userid,
        newRoom: newRoom,
        bed: bed,
        ambulance:ambulance
    }
    return job
}