'use client'
import { Timestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Patient } from "../../../models/Patient";
import { Bed, BedProps, RoomProps } from "../../../models/Room";
import { UpdateBed } from "../../firebase/firestore";
import PatientCard from "../patient/patientCard";
import PaitentBedList from "../patient/patientBedList";
import EditBed from "./editBed";
import { BedContext } from "../../context/bedContext";
import { Bill, BillConstructor, BillProps } from "../../../models/Bill";
import { CreateBill } from "../../firebase/billFirestore";
import { RoomContext } from "../../context/roomContext";
import { AuthContext } from "../../context/authContext";

export default function BedCard({ index, bed, room, onBedHandle, onRoomHandle }: any & BedProps & RoomProps & { onBedHandle: () => void } & { onRoomHandle: () => void }) {

    const [modal, setModal] = useState(false)
    const { bedState, setBedState } = useContext(BedContext);
    const { roomState, setRoomState } = useContext(RoomContext)
    const { authState, setAuthState } = useContext(AuthContext)
    let bedColor;
    if (bed.status === 'green') {
        bedColor = 'bg-green-400'
    }
    else if (bed.status === 'red') {
        bedColor = 'bg-red-400'
    }
    else if (bed.status === 'yellow') {
        bedColor = 'bg-yellow-400'
    }

    const handleClick = (e: any) => {
        setModal(!modal)
        setBedState(bed)
        setRoomState(room)
    }

    const handleFormClick = (e: any) => {
        e.stopPropagation();
    }
    const onEndUse = async (e: any) => {
        e.preventDefault()
        try {
            bed.patient = {} as Patient;
            bed.status = 'red';
            bed.useDate = null;
            await UpdateBed(roomState.id, { bed })
            onBedHandle()
        } catch (error) {

        }
    }

    const closeModal = () => {
        setModal(false)
    }

    return (
        <>
            <button onClick={handleClick} className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex justify-center items-center ${bedColor}`}>
                {index}
            </button>
            {modal === true ? (
                <div className='fixed inset-0 z-20 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleClick}>
                    <div className='w-[500px] flex flex-col'>
                        <div className='bg-white p-2 rounded-xl flex flex-col'>
                            <div className="relative w-full flex flex-col justify-between items-center text-xl font-semibold">
                                {
                                    bed.status === "green" ? (
                                        <>
                                            <EditBed closeModal={closeModal} bed={bed} room={room} onBedHandle={onBedHandle} onRoomHandle={onRoomHandle} />
                                            {/* <div className=" w-full overflow-auto max-h-screen flex flex-col justify-center items-center">
                                                <PaitentBedList onHandle={onBedHandle} />
                                            </div>
                                            <div className="absolute top-0 right-0">
                                                <button onClick={onEndUse} className="text-sm bg-red-500 rounded p-1 font-bold text-white">End Use</button>
                                            </div> */}
                                        </>
                                    ) : null
                                }
                                {
                                    bed.status === "yellow" ? (
                                        Object.keys(bed.patient).length > 0 ? (
                                            <>
                                                <div className="w-full flex flex-col justify-start ">
                                                    <h1>Name: {bed.patient.name}</h1>
                                                    <h1>Gender: {bed.patient.gender}</h1>
                                                    <h1>Age: {calculateAge(bed.patient.dob)}</h1>
                                                    <h1>Doctor: {bed.doctor}</h1>
                                                    <h1>Sickness: {bed.sickness}</h1>
                                                </div>
                                                {
                                                    authState.role === "Admin" ? (
                                                        <div className="absolute top-0 right-0">
                                                            <button onClick={onEndUse} className="text-sm bg-blue-500 rounded p-1 font-bold text-white">End Use</button>
                                                        </div>
                                                    ) : null
                                                }
                                            </>
                                        ) : null
                                    ) : null
                                }
                                {
                                    bed.status === "red" ? (
                                        <EditBed closeModal={closeModal} bed={bed} room={room} onBedHandle={onBedHandle} onRoomHandle={onRoomHandle} />
                                    ) : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export const calculateAge = (date: Timestamp) => {
    if (!date) {
        return 0;
    }
    const today = new Date();
    const birthDate = new Date(date.toDate());
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}