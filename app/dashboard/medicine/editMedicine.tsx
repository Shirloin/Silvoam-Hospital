'use client'
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Medicine, MedicineProps } from "../../../models/Medicine";
import { UpdateMedicine } from "../../firebase/medicineFirestore";
import { handleFormClick } from "../../utilities/GlobalFunction";

export default function EditMedicine({ medicine, refetch }: MedicineProps & { refetch: () => void }) {

    const [modal, setModal] = useState(false)
    const [newMedicine, setNewMedicine] = useState<Medicine>(medicine)

    const handleClick = () => {
        setModal(!modal)
    }

    const handleOnChange = (e: any) => {
        const { name, value } = e.target
        setNewMedicine({ ...newMedicine, [name]: value })
    }

    const handleSubmit = async(e: any) => {
        e.preventDefault()
        await UpdateMedicine({medicine})
        refetch()
        handleClick()
    }


    return (
        <>
        <button onClick={handleClick}>
            <FontAwesomeIcon
                icon={faEdit}
                style={{ fontSize: 20, color: "black" }
            }
            />
        </button>
            {modal === true ? (
                <div className='fixed inset-0 z-20 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleClick}>
                    <div className='w-[500px] flex flex-col'>
                        <div className='bg-white p-2 rounded-xl flex flex-col'>
                            <form className='px-10 py-4' onClick={handleFormClick}>
                                <label className='text-md font-bold'>Name</label>
                                <input type="text" name="name"
                                    className='border-black border-2 rounded w-full my-2 p-2 text-md'
                                    placeholder='Name'
                                    value={newMedicine.name}
                                    onChange={handleOnChange} />

                                <label className='text-md font-bold'>Price</label>
                                <input type="number" name="price"
                                    className='border-black border-2 rounded w-full my-2 p-2 text-md'
                                    placeholder='Price'
                                    value={newMedicine.price}
                                    onChange={handleOnChange} />

                                <label className='text-md font-bold'>Stock</label>
                                <input type="number" name="stock"
                                    className='border-black border-2 rounded w-full my-2 p-2 text-md'
                                    placeholder='Stock'
                                    value={medicine.stock}
                                    onChange={handleOnChange} />
                                <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-600 rounded p-2 w-full my-2 text-md font-bold text-white '>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}