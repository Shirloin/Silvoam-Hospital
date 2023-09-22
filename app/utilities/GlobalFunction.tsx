import { Timestamp } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const handleFormClick = (e: any) => {
    e.stopPropagation();
}
