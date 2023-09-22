/* eslint-disable react/jsx-key */
'use client'
import { getAuth } from "firebase/auth";
import { stat } from "fs";
import { useContext, useEffect, useState } from "react";
import { Appointment } from "../../../models/Appointment";
import { AuthContext } from "../../context/authContext";
import { GetAppointment, GetData } from "../../firebase/firestore";
import AddAppointment from "./addAppointment";
import AppointmentCard from "./appointmentCard";

export default function Appointment() {

    const [appointment, setAppointment] = useState<Appointment[]>([])
    const [statusChanged, setStatusChanged] = useState(false);
    const auth = getAuth()
    const {authState, setAuthState} = useContext(AuthContext)


    const fetchAppointments = async () => {
        let data
        if(authState.role === "Doctor"){
            const user = auth.currentUser
            if(user){
                data = await GetAppointment(user.uid);
            }
        }
        else{
            data = await GetData("appointments")
        }
        if (data) {
            const appointmentData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Appointment[]
            setAppointment(appointmentData)
        }
    }

    // const filteredAppointments = appointment.filter((a) => a.status !== "Completed")

    let sortedAppointments = appointment.sort((a, b) => {
        const statusOrder = ["In Progress", "Queued", "Skipped", "Completed"];

        if (a.status !== b.status) {
            return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
        }
        else {
            if (a.queueCategory !== b.queueCategory) {
                return a.queueCategory === "Urgent" ? -1 : 1;
            }
            else {
                if(a.dateTime.toDate() < b.dateTime.toDate()){
                    return -1;
                }
                else if(a.dateTime.toDate() > b.dateTime.toDate()){
                    return 1;
                }
                return -1;
                // return a.queue - b.queue;
            }
        }

    })

    useEffect(() => {
        fetchAppointments()
    }, [])

    const handleStatusChange = () => {
        setStatusChanged(!statusChanged)
    }

    const onAddClick = () => {
        fetchAppointments()
    }

    const refetch = () => {
        fetchAppointments()
    }

    return (
        <>
            <div className="bg-white">
                <div className="relative border-b-2 border-black">
                    <div className="px-10 flex justify-between items-center gap-4 h-24 w-full text-2xl">
                        {
                            authState.role === "Nurse" ? (
                                <AddAppointment onAddClick={onAddClick} />
                            ):null
                        }
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
                                    <div className=" flex flex-col justify-center items-center">
                                        <div className="text-black font-semibold">
                                            Date Time
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/6 flex justify-center items-center ">
                                    <div className="text-black font-semibold">
                                        Doctor
                                    </div>
                                </div>
                                <div className="w-1/6 flex justify-center items-center">
                                    <div className="text-black font-semibold">
                                        Bed Number
                                    </div>
                                </div>
                                <div className="w-1/6 flex justify-center items-center">
                                    <div className="text-black font-semibold">
                                        Category
                                    </div>
                                </div>
                                <div className="w-1/6 flex justify-center items-center ">
                                    <div className="text-black font-semibold">
                                        Queue
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/6 flex justify-center">
                                <div className="p-2">
                                    Action
                                </div>
                            </div>
                            <div className="w-1/6 flex justify-center">
                                <div className="p-2">
                                    Delete
                                </div>
                            </div>
                        </div>
                        {
                            sortedAppointments.map((a, index) => (
                                <AppointmentCard key={a.id} index={index} appointment={a} refetch={refetch} handleStatusChange={handleStatusChange} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>

    );
}