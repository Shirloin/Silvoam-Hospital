'use client'
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { Job, JobConstructor } from "../../../models/Job";
import { BedProps, Room, RoomProps } from "../../../models/Room";
import PaitentBedList from "../patient/patientBedList";
import EraseBed from "./eraseBed";
import MoveBed from "./moveBed";

export default function EditBed({ bed, room, onBedHandle, onRoomHandle, closeModal }: BedProps & RoomProps & { onBedHandle: () => void } & { onRoomHandle: () => void } & { closeModal: () => void }) {

    const [roomNumber, setRoomNumber] = useState(bed.number)
    const [addPatient, setAddPatient] = useState(false)
    const [job, setJob] = useState<Job | null>(null);
    

    const handleOnChange = (e: any) => {
        setRoomNumber(e.target.value)
    }
    const handleFormClick = (e: any) => {
        e.stopPropagation();
    }

    const handlePatient = (e:any)=>{
        e.preventDefault()
        setAddPatient(true)
    }

    return (
        <>
            {
                addPatient ? (
                    <>
                        <div className=" w-full overflow-auto max-h-screen flex flex-col justify-center items-center">
                            <PaitentBedList onHandle={onBedHandle} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="px-10 py-4" onClick={handleFormClick}>
                            {
                                bed.status === "green" ? (
                                    <button onClick={handlePatient} className='bg-blue-500 hover:bg-blue-600 rounded p-2 w-full my-2 text-md font-bold text-white '>Add Patient</button>
                                ):null
                            }
                            <label className='text-md font-bold'>New Room</label>
                            <input type="text" name="number"
                                className='border-black border-2 rounded w-full my-2 p-2 text-md'
                                placeholder='New Room'
                                value={roomNumber}
                                onChange={handleOnChange}
                            />
                            <MoveBed closeModal={closeModal} bed={bed} room={room} roomNumber={roomNumber}  />
                            <EraseBed bed={bed} room={room} closeModal={closeModal} />
                        </div>
                    </>
                )
            }
        </>
    );
}