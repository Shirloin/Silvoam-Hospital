'use client'
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Ambulance } from "../../../models/Ambulance";
import { Job, JobConstructor } from "../../../models/Job";
import { Medicine } from "../../../models/Medicine";
import { Notification, NotificationConstructor } from "../../../models/Notification";
import { Prescription, PrescriptionProps } from "../../../models/Prescription";
import { User } from "../../../models/User";
import { MedicineContext } from "../../context/medicineContext";
import { UpdateStaff } from "../../firebase/clientApp";
import { CreateJob } from "../../firebase/jobFirestore";
import { CreateNotification } from "../../firebase/notificationFirestore";
import { UpdatePrescription } from "../../firebase/prescriptionFirestore";
import { GetStaff } from "../../firebase/staffFirestore";
import { handleFormClick } from "../../utilities/GlobalFunction";
import MedicineDropdown from "../medicine/medicineDropdown";

export default function EditPrescription({ prescription, refetch }: PrescriptionProps & { refetch: () => void }) {

    const [modal, setModal] = useState(false)
    const [newPrescription, setNewPrescription] = useState<Prescription>(prescription)
    const { medicineState, setMedicineState } = useContext(MedicineContext)
    const [job, setJob] = useState<Job | null>(null);
    const [notification, setNotification] = useState<Notification | null>(null)
    const [user, setUser] = useState<User>({} as User)

    const handleClick = () => {
        console.log(prescription.medicines)
        setMedicineState([])
        setModal(!modal)
    }

    const handleOnChange = (e: any) => {
        const { name, value } = e.target
        setNewPrescription({ ...newPrescription, [name]: value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await UpdatePrescription({ prescription: newPrescription })
        refetch()
        handleClick()
    }

    const handleComplete = async (e: any) => {
        e.preventDefault()
        if(job && notification){
            prescription.status = "Completed"
            user.jobWeight = user.jobWeight + 1;
            await UpdateStaff(user)
            await UpdatePrescription({prescription})
            await CreateJob({job})
            await CreateNotification({notification})
        }
        refetch()
        handleClick()
    }

    useEffect(() => {
        const fetchData = async () => {
            const user = await GetStaff("Nurse");
            if (user) {
                let date = new Date();
                date.setHours(date.getHours() + 1);
                setUser(user)
                setJob(JobConstructor("Delivering Medicine To " + prescription.patient.name, "Delivering Medicine", prescription.patient, Timestamp.fromDate(date), prescription.room,  user.id, "", "", {} as Ambulance));
                setNotification(NotificationConstructor("Deliver Medicine To " + prescription.patient.name, user.id))
            }
        };
        fetchData()
        setNewPrescription({ ...newPrescription, medicines: medicineState })
    }, [medicineState])

    return (
        <>
            <button onClick={handleClick}>
                <FontAwesomeIcon
                    icon={faEdit}
                    style={{ fontSize: 20, color: "black" }
                    }
                />
            </button>
            {modal === true ? (
                <div className='fixed inset-0 z-20 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleClick}>
                    <div className='w-[500px] flex flex-col'>
                        <div className='bg-white p-2 rounded-xl flex flex-col'>
                            <form className='px-10 py-4' onClick={handleFormClick}>
                                <label className='text-md font-bold'>Name</label>

                                <label className='text-md font-bold'>Medicine</label>
                                <div className="relative">
                                    <MedicineDropdown />
                                </div>
                                <label className='text-md font-bold'>Note</label>
                                <textarea onChange={handleOnChange} name="note" value={newPrescription.note} className="w-full h-40 p-2 border-2 border-black rounded-md resize-none" placeholder="Note..."></textarea>
                                <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-600 rounded p-2 w-full my-2 text-md font-bold text-white '>Save</button>
                                {
                                    prescription.status !== "Completed" ? (
                                        <button onClick={handleComplete} className='bg-blue-500 hover:bg-blue-600 rounded p-2 w-full my-2 text-md font-bold text-white '>Complete</button>
                                    ) : null
                                }
                            </form>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}