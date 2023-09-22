'use client'
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { AppointmentProps } from "../../../models/Appointment";
import { UpdateAppointment } from "../../firebase/firestore";

export default function AppointmentStatus({ appointment, handleStatusChange }: AppointmentProps & {handleStatusChange: ()=>void}) {

    const [status, setStatus] = useState(appointment.status)
    const [isOpen, setIsOpen] = useState(false)
    const statusList = [
        "Queued",
        "In Progress",
        "Skipped",
    ]

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleClick = async(e:any, p:string)=>{
        setStatus(p)
    }
    useEffect(()=>{
        appointment.status = status;
        UpdateAppointment({appointment})
        handleStatusChange()
    }, [status])

    return (
        <>
            <div className='relative w-full flex justify-center items-center'>
                <button onClick={(e: any) => { e.preventDefault() }} className='relative w-full px-2 flex justify-center items-center bg-white border-2 border-black focus:outline-none text-gray-600 rounded group'>
                    <div className='flex justify-between items-center w-full'>
                        <h1>{status}</h1>
                        <svg className="-mr-1 h-8 w-8 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className='absolute z-10 hidden group-hover:block min-w-full border-black border-2 top-full bg-white shadow-md rounded transition'>
                        <ul className='text-left rounded'>
                            {statusList.map((p, index)=>(
                                // eslint-disable-next-line react/jsx-key
                                <li className='p-2 hover:bg-gray-100 border-b' key={index} onClick={(e:any) =>(handleClick(e, p))} >{p}</li>
                            ))}
                        </ul>
                    </div>
                </button>
            </div>
        </>
    );
}