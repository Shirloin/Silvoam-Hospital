/* eslint-disable react/jsx-key */
import { faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp } from "firebase/firestore";
import { useContext } from "react";
import { AppointmentProps } from "../../../models/Appointment";
import { AuthContext } from "../../context/authContext";
import { DeleteAppointment, UpdateAppointment, UpdateQueue, UpdateStatus } from "../../firebase/firestore";
import { calculateAge } from "../room/bedCard";
import AppointmentStatus from "./appointmentStatus";
import CompleteAppointment from "./completeAppointment";

export default function AppointmentCard({ appointment, index, handleStatusChange, refetch }: AppointmentProps & { index: number, handleStatusChange: () => void } & { refetch: () => void }) {

    const date = appointment.dateTime.toDate()
    const { authState, setAuthState } = useContext(AuthContext)


    const handleComplete = async (e: any) => {
        e.preventDefault()
        appointment.status = "Completed"
        const updateQueuePromise = UpdateQueue(appointment.queue);
        const updateStatusPromise = UpdateStatus();
        const updateAppointmentPromise = UpdateAppointment({ appointment });

        // Wait for all the update tasks to complete
        await Promise.all([updateQueuePromise, updateStatusPromise, updateAppointmentPromise]);
        // await UpdateQueue(appointment.queue)
        // await UpdateStatus()
        // await UpdateAppointment({appointment})
        refetch()
    }

    const handleDelete = async (e: any) => {
        e.preventDefault()
        await UpdateQueue(appointment.queue)
        await DeleteAppointment({ appointment })
        handleStatusChange()
        refetch()
    }

    return (
        <div className="w-full rounded-md border-2 border-black flex justify-between items-center">
            <div className=" w-full flex justify-start">
                <div className="p-2 w-1/5 flex flex-col justify-center">
                    <div className="font-semibold text-xl">
                        {appointment.patient.name}
                    </div>
                    <div className="text-md text-gray-500">
                        {calculateAge(appointment.patient.dob) + " yrs, " + appointment.patient.gender}
                    </div>
                </div>
                <div className="w-1/6 flex justify-center font-bold text-black items-center">
                    {
                        authState.role !== "Doctor" ? (
                            <>
                                {appointment.status !== "Completed" ?
                                    (
                                        <AppointmentStatus key={appointment.id} appointment={appointment} handleStatusChange={handleStatusChange} />
                                    ) : (
                                        "Completed"
                                    )}
                            </>
                        ) : (appointment.status)
                    }
                </div>
                <div className="w-1/6 flex flex-col justify-center items-center ">
                    <div className=" flex flex-col justify-center items-center">
                        <div className="text-black font-semibold">
                            {calculateDate(appointment.dateTime)}
                        </div>
                        <div className="text-gray-500 text-sm">
                            {calculateTime(appointment.dateTime)}
                        </div>
                    </div>
                </div>
                <div className="w-1/6 flex justify-center items-center ">
                    <div className="text-black font-semibold">
                        {appointment.doctor.name}
                    </div>
                </div>
                <div className="w-1/6 flex justify-center items-center">
                    <div className="text-black font-semibold">
                        {appointment.bed.number ? appointment.bed.number : "-"}
                    </div>
                </div>
                <div className="w-1/6 flex justify-center items-center">
                    <div className="text-black font-semibold">
                        {appointment.queueCategory}
                    </div>
                </div>
                <div className="w-1/6 flex justify-center items-center ">
                    <div className="text-black font-semibold">
                        {index + 1}
                    </div>
                </div>
            </div>
            <div className="w-1/6 flex justify-center">
                <div className="p-2">
                    {
                        authState.role === "Doctor" ? (
                            <>
                                {
                                    appointment.status !== "Completed" ?
                                        (
                                            <CompleteAppointment appointment={appointment} refetch={refetch} />
                                        ) : "Completed"

                                }
                            </>
                        ) : null
                    }

                </div>
            </div>
            <div className="w-1/6 flex justify-center">
                <div className="p-2">
                    {
                        authState.role !== "Doctor" ? (
                            <button onClick={handleDelete} className="bg-red-500 rounded-md text-white font-semibold my-2 p-3">
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    style={{ fontSize: 20, color: "white" }}
                                />
                            </button>
                        ) : null
                    }
                </div>
            </div>
        </div>
    );
}
export const calculateDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate()
    const year = date.getFullYear()

    let month = (date.getMonth() + 1).toString()

    if (month.length === 1) {
        month = "0" + month;
    }

    let day = date.getDate().toString()

    if (day.length === 1) {
        day = "0" + day;
    }

    const formatDate = `${day}-${month}-${year}`
    return formatDate
}

export const calculateTime = (timestamp: Timestamp) => {
    const date = timestamp.toDate()
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime
}