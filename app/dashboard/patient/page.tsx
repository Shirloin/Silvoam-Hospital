'use client'
import { Timestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Patient } from "../../../models/Patient";
import { GetData } from "../../firebase/firestore";
import AddPatient from "./addPatient";
import PatientCard from "./patientCard";
import SearchPatient from "../../components/search";
import Search from "../../components/search";
import { AuthContext } from "../../context/authContext";

export default function PatientList() {

    const [patients, setPatients] = useState<Patient[]>([]);
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
    const {authState, setAuthState} = useContext(AuthContext)

    const fetchPatients = async () => {
        const data = await GetData('patients');
        if (data) {
            const patientData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Patient[]
            setPatients(patientData);
            setFilteredPatients(patientData)
        }
    };
    const handlePatient = () =>{
        fetchPatients();
    }
    useEffect(() => {

        fetchPatients();
    }, []);

    const handleSearch = (searchTerm: string) => {
        const filtered = patients.filter((patient) =>
          patient.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPatients(filtered);
      };

    return (
        <>
            <div className="bg-white">
                <div className="relative border-b-2 border-black">
                    <div className="px-10 flex justify-between items-center gap-4 h-24 w-full text-2xl">
                        {
                            authState.role === "Admin" ? (
                                <AddPatient onPatientHandle = {handlePatient}/>
                            ):null
                        }
                        <Search onSearch={handleSearch}/>
                    </div>
                </div>
                <div className="relative min-w-screen h-full flex justify-center items-center">
                    <div className="min-w-screen sm:min-w-screen h-full grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mx-10 my-10">
                        {filteredPatients.map((patient) => (
                            <PatientCard
                                patient={patient}
                                key={patient.id}
                                onPatientHandle = {handlePatient}
                                />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}