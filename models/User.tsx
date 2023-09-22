import { Timestamp } from "firebase/firestore";

export interface User{
    id: string;
    name: string;
    role: string;
    email: string;
    password: string;
    startShift: string;
    endShift: string;
    status: string;
    jobWeight: number;
}

export interface UserProps{
    user: User;
}

export function UserConstructor(){
    const user: User = {
        id: "",
        name: "",
        role: "Role",
        email: "",
        password: "",
        startShift: "00:00",
        endShift: "00:00",
        status: "",
        jobWeight: 0
    }
    return user;
}