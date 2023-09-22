'use client'
import { useState } from "react";
import { AppointmentProps } from "../../../models/Appointment";
import { UpdateAppointment } from "../../firebase/firestore";
import { handleFormClick } from "../../utilities/GlobalFunction";

export default function CompleteAppointment({ appointment, refetch }: AppointmentProps & { refetch: () => void }) {

    const [modal, setModal] = useState(false);
    const [result, setResult] = useState('')
    const handleClick = (e: any) => {
        setModal(!modal)
    }

    const handleOnChange = (e:any)=>{
        const [name, value] = e.target
        setResult(value)
    }

    const handleSubmit = async(e:any)=>{
        handleClick(e)
        appointment.status = "Completed"
        await UpdateAppointment({appointment})
        refetch()
    }

    return (
        <>
            <button onClick={handleClick} className="bg-green-500 rounded-md text-white font-semibold my-2 p-3">Complete</button>
            {
                modal && (
                    <div className='fixed inset-0 z-20 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleClick}>
                        <div className='w-[500px] flex flex-col'>
                            <div className='bg-white p-2 rounded-xl flex flex-col'>
                                <form className='px-10 py-4' onClick={handleFormClick}>
                                    <label className='text-md font-bold'>Appointment Result</label>
                                    <input type="text" name="result"
                                        className='border-black border-2 rounded w-full my-2 p-2 text-md'
                                        placeholder='Result'
                                        value={result}
                                        onChange={(e:any) => {setResult(e.target.value)}} />
                                    <button onClick={handleSubmit} className="bg-blue-500 w-full rounded-md text-white font-semibold my-2 p-3">Save</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}