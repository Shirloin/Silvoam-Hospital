'use client'
import { useEffect, useState } from "react";
import { Patient } from "../../../models/Patient";
import { BedProps } from "../../../models/Room";
import Search from "../../components/search";
import { GetData } from "../../firebase/firestore";
import PatientBedCard from "./patientBedCard";

export default function PaitentBedList({onHandle}:{ onHandle: () => void }) {

    const [patients, setPatients] = useState<Patient[]>([]);
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);

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
    const handlePatient = () => {
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
    const handleFormClick = (e: any) => {
        e.stopPropagation();
    }

    return (

        <div className="w-full max-h-[500px] min-h-[500px] p-2 flex flex-col items-center" onClick={handleFormClick}>
            <Search onSearch={handleSearch} />
            <div className="w-full p-2 flex flex-col justify-center items-center gap-2">
                {filteredPatients.map((patient) => (
                    <PatientBedCard
                        patient={patient}
                        key={patient.id}
                        onHandle={onHandle}
                    />
                ))}

            </div>
        </div>
    );
}