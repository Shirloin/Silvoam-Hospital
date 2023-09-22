'use client'
import { useEffect, useState } from "react";
import { Prescription } from "../../../models/Prescription";
import { GetData } from "../../firebase/firestore";
import AddPrescription from "./addPrescription";
import PrescriptionCard from "./prescriptionCard";

export default function PrescriptionList() {

    const [prescription, setPrescription] = useState<Prescription[]>([])

    const fetchPrescription = async () => {
        const data = await GetData("prescriptions");
        if (data) {
            const prescriptionData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Prescription[]
            const statusOrder = ["In Progress", "Queued", "Completed"];
            const sortedPrescriptions = prescriptionData.sort((a, b) => {
                const aStatusIndex = statusOrder.indexOf(a.status);
                const bStatusIndex = statusOrder.indexOf(b.status);
                return aStatusIndex - bStatusIndex;
            });
            setPrescription(sortedPrescriptions)
        }
        else {
            setPrescription({} as Prescription[])
        }
    }

    const refetch = () => {
        fetchPrescription()
    }

    useEffect(() => {
        fetchPrescription()
    }, [prescription])



    return (
        <>
            <div className="bg-white">
                <div className="relative border-b-2 border-black">
                    <div className="px-10 flex justify-between items-center gap-4 h-24 w-full text-2xl">
                        <AddPrescription refetch={refetch} />
                    </div>
                </div>
                <div className="relative min-w-screen h-full flex justify-center items-center">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2  m-10">
                        <div className="w-full flex justify-between items-center font-semibold text-md">
                            <div className=" w-full flex justify-start">
                                <div className="p-2 w-1/5 flex flex-col justify-center">
                                    Patient
                                </div>
                                <div className="w-1/6 flex justify-center items-center">
                                    Status
                                </div>
                                <div className="w-1/6 flex flex-col justify-center items-center ">
                                    <div className="text-black font-semibold">
                                        Medicine(s)
                                    </div>
                                </div>
                                <div className="w-1/6 flex justify-center items-center ">
                                    <div className="text-black font-semibold">
                                        Room
                                    </div>
                                </div>
                                <div className="w-1/6 flex justify-center items-center ">
                                    <div className="text-black font-semibold">
                                        Note
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/6 flex justify-center">
                                <div className="p-2">
                                    Edit
                                </div>
                            </div>
                            <div className="w-1/6 flex justify-center">
                                <div className="p-2">
                                    Delete
                                </div>
                            </div>
                        </div>
                        {prescription.length > 0 ? (
                            prescription.map((a, index) => (
                                <PrescriptionCard
                                    key={a.id}
                                    refetch={refetch}
                                    prescription={a}
                                />
                            ))
                        ) : (
                            <p>No prescriptions found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}