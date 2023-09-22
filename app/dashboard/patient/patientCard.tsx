'use client'
import { useContext } from "react";
import { Patient, PatientProps } from "../../../models/Patient";
import { AuthContext } from "../../context/authContext";
import EditPatient from "./editPatient";

export default function PatientCard({patient, onPatientHandle }: PatientProps & {onPatientHandle: () => void}) {
    
    const {authState, setAuthState} = useContext(AuthContext)

    return (
        <div className="rounded-xl min-w-96 sm:w-[500px] md:w-[350px] lg:w-[400px] xl:[420px] h-60 border-2 p-2 bg-blue-200">
            <div className="p-2 w-full h-full flex justify-between">
                <div className="flex flex-col justify-evenly">
                    <label className="text-xl">Name: {patient.name}</label>
                    <label className="text-xl">Phone: {patient.phone}</label>
                    <label className="text-xl">Gender: {patient.gender}</label>
                    <label className="text-xl">DOB: {patient.dob.toDate().toLocaleDateString(
                        'en-US', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    }
                    )}</label>
                    <label className="text-xl">Email: {patient.email}</label>
                    <label className="text-xl">Address: {patient.address}</label>
                </div>
                {
                    authState.role === "Admin" ? (
                        <EditPatient
                            patient={patient}
                            onPatientHandle = {onPatientHandle}
                        />
                    ):null
                }

            </div>
        </div>
    );
}