'use client'
import { useState } from "react";
import { Room } from "../../../models/Room";
import { CreateRoom, GetRoom } from "../../firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddRoom({ onRoomHandle }: { onRoomHandle: () => void }) {

    const [modal, setModal] = useState(false);
    const [capacity, setCapacity] = useState("");
    const [room, setRoom] = useState<Room>({
        id: '',
        number: '',
        type: 'Room Type',
        capacity: 0,
        price: 0,
        bed: 0,
        beds: []
    })


    const handleOnChange = (e: any) => {
        const { name, value } = e.target
        setRoom({ ...room, [name]: value })
    }

    const handleClick = (e: any) => {
        e.preventDefault()
        setModal(!modal)
    }
    const handleFormClick = (e: any) => {
        e.stopPropagation();
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (await GetRoom(room.number) === null) {
            try {
                setRoom({ ...room, bed: 0 })
                await CreateRoom({ room })
                onRoomHandle()
                toast.success("Success To Add Room", { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 })
            } catch (error) {
                console.error('Error during user registration:', error);
            }
        }
        else {
            toast.error("Room Already Exists", { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 })
        }
        setModal(!modal)
    }


    return (
        <>
            <button className="bg-blue-600 rounded-md p-2 text-white" onClick={handleClick}>Add Room</button>
            {/* <ToastContainer /> */}
            {modal === true ? (
                <div className='fixed inset-0 z-20 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleClick}>
                    <div className='w-[500px] flex flex-col'>
                        <div className='bg-white p-2 rounded-xl flex flex-col'>
                            <form className='px-10 py-4' onClick={handleFormClick}>
                                <label className='text-md font-bold'>Room Number</label>
                                <input type="text" name="number"
                                    className='border-black border-2 rounded w-full my-2 p-2 text-md'
                                    placeholder='Room Number'
                                    value={room.number}
                                    onChange={handleOnChange}
                                />
                                <label className='text-md font-bold'>Room Type</label>
                                <div className='relative w-full flex justify-center items-center'>
                                    <button onClick={(e: any) => { e.preventDefault() }} className='relative w-full my-2 p-2 flex justify-center items-center bg-white border-2 border-black focus:outline-none text-gray-600 rounded group'>
                                        <div className='flex justify-between items-center w-full'>
                                            <h1>{room.type}</h1>
                                            <svg className="-mr-1 h-10 w-10 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className='absolute hidden group-hover:block min-w-full border-black border-2 top-full bg-white shadow-md rounded transition'>
                                            <ul className='text-left rounded'>
                                                <li className='p-2 hover:bg-gray-100 border-b' onClick={() => {
                                                    setRoom({ ...room, type: "Single Room", price: 980000, capacity: 1 }); setCapacity("0-1")
                                                }}>Single Room</li>
                                                <li className='p-2 hover:bg-gray-100 border-b' onClick={() => {
                                                    setRoom({ ...room, type: 'Sharing Room', price: 450000, capacity: 6 }); setCapacity("0-6")
                                                }} >Sharing Room</li>
                                                <li className='p-2 hover:bg-gray-100 border-b' onClick={() => {
                                                    setRoom({ ...room, type: 'VIP Room', price: 1550000, capacity: 1 }); setCapacity("0-1")
                                                }} >VIP Room</li>
                                                <li className='p-2 hover:bg-gray-100 border-b' onClick={() => {
                                                    setRoom({ ...room, type: 'Royale Room', price: 2210000, capacity: 1 }); setCapacity("0-1")
                                                }} >Royale Room</li>
                                                <li className='p-2 hover:bg-gray-100 border-b' onClick={() => {
                                                    setRoom({ ...room, type: 'Emergency Unit', price: 0, capacity: 12 }); setCapacity("0-12")
                                                }} >Emergency Unit</li>
                                            </ul>
                                        </div>
                                    </button>
                                </div>

                                <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-600 rounded p-2 w-full my-2 text-md font-bold text-white '>Add Room</button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}