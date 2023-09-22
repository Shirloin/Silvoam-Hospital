'use client'
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { User, UserProps } from "../../../models/User";
import { UpdateStaff } from "../../firebase/clientApp";
import { handleFormClick } from "../../utilities/GlobalFunction";
import { toast, ToastContainer } from 'react-toastify';

export default function EditStaff({ user, refetch }: UserProps & { refetch: () => void }) {
    const [modal, setModal] = useState(false)

    const [newUser, setNewUser] = useState<User>(user)
    const roleList = [
        "Doctor", "Nurse", "Pharmacist",
        "Cleaning Service", "Kitchen Staff", "Chef", "Driver"
    ]

    const shiftList = [
        { start: "05:00", end: "13:00" },
        { start: "13:00", end: "21:00" },
        { start: "21:00", end: "05:00" }
    ]

    const handleClick = () => {
        setModal(!modal)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await UpdateStaff(newUser)
        refetch()
        handleClick()
        toast.success("Update Staff Success", { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 })
    }

    const handleApprove = async (e: any) => {
        e.preventDefault()
        if (newUser.startShift !== "") {
            newUser.status = "Approved"
            await UpdateStaff(newUser)
            refetch()
            handleClick()
        }
    }
    return (
        <>
            <button className="bg-blue-500 rounded-md text-white font-semibold my-2 p-3" onClick={handleClick}>
                <FontAwesomeIcon
                    icon={faEdit}
                    style={{ fontSize: 20, color: "black" }}
                />
            </button>
            {modal === true ? (
                <div className='fixed inset-0 z-20 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleClick}>
                    <div className='w-[500px] flex flex-col'>
                        <div className='bg-white p-2 rounded-xl flex flex-col'>
                            <form className='px-10 py-4' onClick={handleFormClick}>
                                {
                                    user.status === "Approved" ?
                                        (
                                            <>
                                                <label className='text-md font-bold'>Name</label>
                                                <input type="text" name="name"
                                                    className='border-black border-2 rounded w-full my-2 p-4 text-md'
                                                    placeholder='Name'
                                                    value={newUser.name}
                                                    onChange={(e: any) => {
                                                        e.preventDefault()
                                                        setNewUser({ ...newUser, name: e.target.value })
                                                    }} />
                                                <div className='relative w-full flex justify-center items-center'>
                                                    <button onClick={(e: any) => { e.preventDefault() }} className='relative w-full my-2 p-2 flex justify-center items-center bg-white border-2 border-black focus:outline-none text-gray-600 rounded group'>
                                                        <div className='flex justify-between items-center w-full'>
                                                            <h1>{newUser.role}</h1>
                                                            <svg className="-mr-1 h-10 w-10 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        <div className='absolute hidden z-10 group-hover:block min-w-full border-black border-2 top-full bg-white shadow-md rounded transition'>
                                                            <ul className='text-left rounded'>
                                                                {
                                                                    roleList.map((a, index) => (
                                                                        <li key={index} className='p-2 hover:bg-gray-100 border-b' onClick={(e: any) => {
                                                                            e.preventDefault()
                                                                            setNewUser({ ...newUser, role: a })
                                                                        }}>{a}</li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    </button>
                                                </div>
                                            </>
                                        ) : null
                                }

                                <div className='relative w-full flex justify-center items-center'>
                                    <button onClick={(e: any) => { e.preventDefault() }} className='relative w-full my-2 p-2 flex justify-center items-center bg-white border-2 border-black focus:outline-none text-gray-600 rounded group'>
                                        <div className='flex justify-between items-center w-full'>
                                            <h1>{newUser.startShift} - {newUser.endShift}</h1>
                                            <svg className="-mr-1 h-10 w-10 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className='absolute hidden group-hover:block min-w-full border-black border-2 top-full bg-white shadow-md rounded transition'>
                                            <ul className='text-left rounded'>
                                                {
                                                    shiftList.map((a, index) => (
                                                        <li key={index} className='p-2 hover:bg-gray-100 border-b' onClick={(e: any) => {
                                                            e.preventDefault()
                                                            setNewUser({ ...newUser, startShift: a.start, endShift: a.end })
                                                        }}>{a.start} - {a.end}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </button>
                                </div>
                                {
                                    user.status !== "Approved" ?
                                        (
                                            <button onClick={handleApprove} className='bg-blue-500 hover:bg-blue-600 rounded p-2 w-full my-2 text-md font-bold text-white '>Approve</button>
                                        ) :
                                        (
                                            <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-600 rounded p-2 w-full my-2 text-md font-bold text-white '>Save</button>
                                        )
                                }
                            </form>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}