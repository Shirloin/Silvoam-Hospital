/* eslint-disable react/jsx-key */
'use client'
import { type } from "os";
import { useContext, useEffect, useState } from "react";
import { Ambulance, AmbulanceConstructor } from "../../../models/Ambulance";
import { PatientContext } from "../../context/patientContext";
import { CreateAmbulance } from "../../firebase/firestore";

export default function AddAmbulance({refetch}: {refetch: ()=>void}) {

    const [modal, setModal] = useState(false)
    const [ambulance, setAmbulance] = useState<Ambulance>(AmbulanceConstructor)
    const [type, setType] = useState('Type')
    

    const typeList = [
        "Supra", "Lamborgini", "Ferrari"
    ]

    const handleClick = () => {
        setModal(!modal)
    }

    const handleFormClick = (e: any) => {
        e.stopPropagation();
    }
    const handleOnChange = (e:any)=>{
        const { name, value } = e.target
        let val = value
        setAmbulance({ ...ambulance, [name]: val })
    }

    const handleSubmit = async(e:any)=>{
        e.preventDefault()
        await CreateAmbulance({ambulance})
        refetch()
        handleClick()
    }

    

    return (
        <>
            <button className="bg-blue-600 rounded-md p-2 text-white" onClick={handleClick}>Add Ambulance</button>
            {modal === true ? (
                <div className='fixed inset-0 z-20 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleClick}>
                    <div className='w-[500px] flex flex-col'>
                        <div className='bg-white p-2 rounded-xl flex flex-col'>
                            <div className="px-10 py-4" onClick={handleFormClick}>
                                <label className='text-md font-bold'>Police Number</label>
                                <input type="text" name="number"
                                    className='border-black border-2 rounded w-full my-2 p-2 text-md'
                                    placeholder='Number'
                                    value={ambulance.number}
                                    onChange={handleOnChange} />
                                <label className='text-md font-bold'>Year</label>
                                <input type="number" name="year"
                                    className='border-black border-2 rounded w-full my-2 p-2 text-md'
                                    placeholder='Year'
                                    value={ambulance.year}
                                    onChange={handleOnChange} />
                                <label className='text-md font-bold'>Type</label>
                                <div className='relative w-full flex justify-center items-center'>
                                    <button onClick={(e: any) => { e.preventDefault() }} className='relative w-full my-2 p-2 flex justify-center items-center bg-white border-2 border-black focus:outline-none text-gray-600 rounded group'>
                                        <div className='flex justify-between items-center w-full'>
                                            <h1>{ambulance.type}</h1>
                                            <svg className="-mr-1 h-10 w-10 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className='absolute hidden group-hover:block min-w-full border-black border-2 top-full bg-white shadow-md rounded transition'>
                                            <ul className='text-left rounded'>
                                                {
                                                    typeList.map((a, index) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                className='p-2 hover:bg-gray-100 border-b'
                                                                onClick={() => { setAmbulance({...ambulance, ["type"]: a}) }}
                                                            >
                                                                {a}
                                                            </li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </button>
                                </div>
                                <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-600 rounded p-2 w-full my-2 text-md font-bold text-white '>Add Ambulance</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}