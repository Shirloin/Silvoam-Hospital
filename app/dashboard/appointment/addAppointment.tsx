'use client'
import { app } from "firebase-admin";
import { Timestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Appointment, AppointmentConstructor } from "../../../models/Appointment";
import { Bed } from "../../../models/Room";
import { BedContext } from "../../context/bedContext";
import { PatientContext } from "../../context/patientContext";
import { UserContext } from "../../context/userContext";
import { CreateAppointment, GetData } from "../../firebase/firestore";
import PaitentListBar from "../patient/patientBedList";
import DoctorDropdown from "./doctorDropdown";
import PatientDropdown from "./patientDropdown";

export default function AddAppointment({ onAddClick }: { onAddClick: () => void }) {

    const [modal, setModal] = useState(false);
    const { patientState, setPatientState } = useContext(PatientContext);
    const { bedState, setBedState } = useContext(BedContext);
    const { userState, setUserState } = useContext(UserContext);
    const [appointment, setAppointment] = useState<Appointment>(AppointmentConstructor);
    const [totalData, setTotalData] = useState(0)
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [isCollision, setIsCollision] = useState(false)

    const fetchBeds = async () => {
        const data = await GetData('beds');
        if (data) {
            const bedData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Bed[]
            const filteredBeds = bedData.filter((bed) => {
                return bed.patient.id && bed.patient.id === patientState.id
            })
            if (filteredBeds.length > 0) {
                setBedState(filteredBeds[0])
            }
            else {
                setBedState({})
            }
        }
    };
    const fetchAppointments = async () => {
        const data = await GetData("appointments");
        if (data) {
            const appointmentsData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Appointment[]
            setAppointments(appointmentsData)
            setTotalData(data.size)
        }
    }

    const handleClick = () => {
        setModal(!modal)
    }

    const handleFormClick = (e: any) => {
        e.stopPropagation();
    }

    const handleOnChange = async (e: any) => {
        const { name, value } = e.target
        let val = value
        if (name === 'dateTime') {
            const date = new Date(value)
            val = Timestamp.fromDate(date)
        }
        setAppointment({ ...appointment, [name]: val })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const isCollide = appointments.some((existingAppointment) => {
            const existingStartTime = existingAppointment.dateTime.toDate();
            const existingEndTime = new Date(existingStartTime.getTime() + 60 * 60 * 1000);
            const currentStartTime = appointment.dateTime.toDate();
            return (
              existingAppointment.doctor.id === appointment.doctor.id &&
              currentStartTime >= existingStartTime &&
              currentStartTime < existingEndTime
            );
          });
        if(isCollide){
            toast.error("Doctor not available", { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 })
        }
        else{
            handleClick();
            await CreateAppointment({ appointment });
            onAddClick();
            toast.success("Add appointment success", { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 })
        }
    }

    useEffect(() => {
        fetchBeds()
        fetchAppointments()
        setAppointment({ ...appointment, ["doctor"]: userState, ["patient"]: patientState, ["bed"]: bedState, ["queue"]: totalData + 1, ["status"]: "Queued", ["result"]: false })
    }, [patientState])



    return (
        <>
            <button className="bg-blue-600 rounded-md p-2 text-white" onClick={handleClick}>Add Appointment</button>
            {modal === true ? (
                <div className='fixed inset-0 z-20 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleClick}>
                    <div className='w-[500px] flex flex-col'>
                        <div className='bg-white p-2 rounded-xl flex flex-col'>
                            <form className='px-10 py-4' onClick={handleFormClick}>
                                <label className='text-md font-bold'>Doctor</label>
                                <div className="relative">
                                    <DoctorDropdown handleOnChange={handleOnChange} />
                                </div>

                                <label className='text-md font-bold'>Patient</label>

                                <div className="relative">
                                    <PatientDropdown handleOnChange={handleOnChange} />
                                </div>

                                <label className='text-md font-bold'>Date Time</label>
                                <input type="datetime-local" name="dateTime"
                                    className='border-black border-2 rounded w-full my-2 p-2 text-md'
                                    placeholder='Date Time'
                                    onChange={handleOnChange} />

                                <div className="w-full flex gap-5">
                                    <label className="space-x-4 flex items-center">
                                        <input
                                            className="h-5 w-5"
                                            type="radio"
                                            name="queueCategory"
                                            value="Normal"
                                            checked={appointment.queueCategory === 'Normal'}
                                            onChange={handleOnChange}
                                        />
                                        <span>Normal</span>
                                    </label>
                                    <label className="space-x-4 flex items-center">
                                        <input
                                            className="w-5 h-5"
                                            type="radio"
                                            name="queueCategory"
                                            value="Urgent"
                                            checked={appointment.queueCategory === 'Urgent'}
                                            onChange={handleOnChange}
                                        />
                                        <span>Urgent</span>
                                    </label>
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