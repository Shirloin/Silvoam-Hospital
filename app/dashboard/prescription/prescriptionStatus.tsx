import { useEffect, useState } from "react";
import { PrescriptionProps } from "../../../models/Prescription";
import { UpdateBill } from "../../firebase/billFirestore";
import { GetOneData } from "../../firebase/firestore";
import { UpdatePrescription } from "../../firebase/prescriptionFirestore";

export default function PrescriptionStatus({ prescription, refetch }: PrescriptionProps & { refetch: () => void }) {

    const [status, setStatus] = useState(prescription.status)
    const statusList = [
        "Queued", "In Progress"
    ]

    const addToBill = async()=>{
        const medicineCost = calculateMedicineCost(prescription.medicines);
        const patient = await GetOneData("patients", prescription.patient.id)
        // const updatedBill = { ...prescription.bill, medicineCost };
        // UpdateBill({ bill: updatedBill });

    }

    useEffect(() => {
        prescription.status = status;
        UpdatePrescription({ prescription })
        if (status === "Completed") {
            addToBill()
        }
        refetch()
    }, [status])

    const calculateMedicineCost = (medicineList: any[]) => {
        let totalCost = 0;
        for (const medicine of medicineList) {
            totalCost += medicine.price;
        }
        return totalCost;
    };


    return (
        <>
            <div className='relative w-full flex justify-center items-center'>
                <button onClick={(e: any) => { e.preventDefault() }} className='relative w-full my-2 px-2 flex justify-center items-center bg-white border-2 border-black focus:outline-none text-gray-600 rounded group'>
                    <div className='flex justify-between items-center w-full'>
                        <h1>{status}</h1>
                        <svg className="-mr-1 h-10 w-10 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className='absolute hidden z-20 group-hover:block min-w-full border-black border-2 top-full bg-white shadow-md rounded transition'>
                        <ul className='text-left rounded'>
                            {
                                statusList.map((a, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className='p-2 hover:bg-gray-100 border-b'
                                            onClick={() => { setStatus(a) }}
                                        >{a}
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </button>
            </div>
        </>
    );
}