'use client'
import { Timestamp } from "firebase/firestore";
import { RouteMatcher } from "next/dist/server/future/route-matchers/route-matcher";
import { useContext, useEffect, useState } from "react";
import { Ambulance } from "../../../models/Ambulance";
import { Job, JobConstructor } from "../../../models/Job";
import { Notification, NotificationConstructor } from "../../../models/Notification";
import { Prescription, PrescriptionConstructor } from "../../../models/Prescription";
import { Bed, Room } from "../../../models/Room";
import { MedicineContext } from "../../context/medicineContext";
import { PatientContext } from "../../context/patientContext";
import { GetData, GetRoom } from "../../firebase/firestore";
import { CreateJob } from "../../firebase/jobFirestore";
import { CreateNotification } from "../../firebase/notificationFirestore";
import { CreatePrescription } from "../../firebase/prescriptionFirestore";
import { GetStaff } from "../../firebase/staffFirestore";
import { handleFormClick } from "../../utilities/GlobalFunction";
import PatientDropdown from "../appointment/patientDropdown";
import MedicineDropdown from "../medicine/medicineDropdown";

export default function AddPrescription({ refetch }: { refetch: () => void }) {

    const [modal, setModal] = useState(false)
    const [prescription, setPrescription] = useState<Prescription>(PrescriptionConstructor)
    const { patientState, setPatientState } = useContext(PatientContext)
    const [bed, setBed] = useState<Bed[]>([])
    const [patientRoom, setPatientRoom] = useState<Room>({} as Room)
    const { medicineState, setMedicineState } = useContext(MedicineContext)
    const [filteredBed, setFilteredBed] = useState<Bed>()
    const [job, setJob] = useState<Job | null>(null);
    const [notification, setNotification] = useState<Notification | null>(null)


    const fetchBed = async () => {
        const data = await GetData("beds");
        if (data) {
            const bedData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Bed[]
            setBed(bedData)
            const filteredBedData = bedData.find((bed) => bed.status === "yellow" && bed.patient && bed.patient.id === patientState.id);
            if (filteredBedData) {
                // console.log("Filtered Bed")
                // console.log(filteredBedData)
                setFilteredBed(filteredBedData);
                const room = await GetRoom(filteredBedData.number);
                if (room) {
                    setPatientRoom(room);
                }
            }
        }
    }

    const handleClick = () => {
        setMedicineState([])
        setModal(!modal)
    }

    const handleOnChange = (e: any) => {
        const { name, value } = e.target
        setPrescription({ ...prescription, [name]: value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if(job && notification){
            setPrescription({ ...prescription, patient: patientState, medicines: medicineState, room: patientRoom, status: "Queued" });
            await CreatePrescription({ prescription })
            // await CreateJob({job})
            await CreateNotification({notification})
        }
        refetch()
        handleClick()
    }

    

    useEffect(() => {
        const fetchData = async () => {
            const user = await GetStaff("Pharmacist");
            if (user) {
                // let date = new Date();
                // date.setHours(date.getHours() + 1);
                // setJob(JobConstructor("Preparing Medicine", "Preparing Medicine", patientState, Timestamp.fromDate(date), {} as Room, user.id, "", "", {} as Ambulance));
                setNotification(NotificationConstructor("Preparing Medicine For " + patientState.name, user.id))
            }
        };
        fetchData()
        fetchBed()
        setPrescription({ ...prescription, patient: patientState, medicines: medicineState, room: patientRoom, status: "Queued" });
    }, [patientState, medicineState])

    return (
        <>
            <button className="bg-blue-600 rounded-md p-2 text-white" onClick={handleClick}>Add Prescription</button>
            {modal === true ? (
                <div className='fixed inset-0 z-20 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleClick}>
                    <div className='w-[500px] flex flex-col'>
                        <div className='bg-white p-2 rounded-xl flex flex-col'>
                            <form className='px-10 py-4' onClick={handleFormClick}>
                                <label className='text-md font-bold'>Patient</label>
                                <div className="relative">
                                    <PatientDropdown handleOnChange={handleOnChange} />
                                </div>
                                <div className="relative">
                                    <MedicineDropdown />
                                </div>
                                <div className="relative">
                                    <textarea onChange={handleOnChange} name="note" value={prescription.note} className="w-full h-40 p-2 border-2 border-black rounded-md resize-none" placeholder="Note..."></textarea>
                                </div>
                                <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-600 rounded p-2 w-full my-2 text-md font-bold text-white '>Add Patient</button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}