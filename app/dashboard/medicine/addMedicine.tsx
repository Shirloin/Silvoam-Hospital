'use client'
import { useEffect, useState } from "react";
import { Medicine, MedicineConstructor, MedicineProps } from "../../../models/Medicine";
import { CreateMedicine } from "../../firebase/medicineFirestore";
import { handleFormClick } from "../../utilities/GlobalFunction";

export default function AddMedicine({refetch }:{ refetch: () => void }) {
    
    const [modal, setModal] = useState(false)
    const [medicine, setMedicine] = useState<Medicine>(MedicineConstructor)

    useEffect(()=>{
    })

    const handleClick = ()=>{
        setModal(!modal)
    }
    const handleOnChange = (e:any)=>{
        const {name, value} = e.target
        setMedicine({ ...medicine, [name]: value })
    }

    const handleSubmit = async(e:any)=>{
        e.preventDefault()
        await CreateMedicine({medicine})
        refetch()
        handleClick()
    }
    
    return (
        <>
            <button className="bg-blue-600 rounded-md p-2 text-white" onClick={handleClick}>Add Medicine</button>
            {modal === true ? (
                <div className='fixed inset-0 z-20 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleClick}>
                    <div className='w-[500px] flex flex-col'>
                        <div className='bg-white p-2 rounded-xl flex flex-col'>
                            <form className='px-10 py-4' onClick={handleFormClick}>
                                <label className='text-md font-bold'>Name</label>
                                <input type="text" name="name"
                                    className='border-black border-2 rounded w-full my-2 p-2 text-md'
                                    placeholder='Name'
                                    value={medicine.name}
                                    onChange={handleOnChange} />

                                <label className='text-md font-bold'>Price</label>
                                <input type="number" name="price"
                                    className='border-black border-2 rounded w-full my-2 p-2 text-md'
                                    placeholder='Price'
                                    value={medicine.price}
                                    onChange={handleOnChange} />

                                <label className='text-md font-bold'>Stock</label>
                                <input type="number" name="stock"
                                    className='border-black border-2 rounded w-full my-2 p-2 text-md'
                                    placeholder='Stock'
                                    value={medicine.stock}
                                    onChange={handleOnChange} />
                                
                                <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-600 rounded p-2 w-full my-2 text-md font-bold text-white '>Add Medicine</button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}