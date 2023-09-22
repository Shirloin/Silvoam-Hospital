import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { Patient, PatientProps} from "../../../models/Patient";
import { UpdatePatient } from "../../firebase/firestore";

// export default function EditPatient({id, name, phone, gender, dob, email, address}: Patient){
export default function EditPatient({patient, onPatientHandle }: PatientProps & {onPatientHandle: () => void}){

    const [modal, setModal] = useState(false)

    const [newP, setPatient] = useState<Patient>({
        id: patient.id,
        name: patient.name,
        phone: patient.phone,
        gender: patient.gender,
        dob: patient.dob,
        email: patient.email,
        address: patient.address
    })

    const handleOnChange = (e: any) => {
        const {name, value} = e.target
        let val = value
        if(name === 'dob'){
            const date = new Date(value)
            val = Timestamp.fromDate(date)
        }
        setPatient({ ...newP, [name]: val })
    }

    const handleClick = (e: any) => {
        e.preventDefault()
        setModal(!modal)
    }

    const handleFormClick = (e: any) => {
        e.stopPropagation();
    }

    const handleSubmit = async(e:any) =>{
        e.preventDefault()
        try {
            await UpdatePatient({patient: newP})
            setModal(!modal)
            onPatientHandle()
          } catch (error) {
            console.error('Error during user Edit:', error);
          }
    }

    return (
        <>
            <button className="bg-blue-500 rounded-md px-4 py-2 max-w-20 max-h-10" onClick={handleClick}>
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
                                <label className='text-md font-bold'>Name</label>
                                <input type="text" name="name"
                                    className='border-black border-2 rounded w-full my-2 p-2 text-md'
                                    placeholder='Name'
                                    value={newP.name}
                                    onChange={handleOnChange} />

                                <label className='text-md font-bold'>Phone</label>
                                <input type="number" name="phone"
                                    className='border-black border-2 rounded w-full my-2 p-2 text-md'
                                    placeholder='Phone'
                                    value={newP.phone}
                                    onChange={handleOnChange} />

                                <label className='text-md font-bold'>Gender</label>
                                <div className="w-full flex gap-5">
                                    <label className="space-x-4 flex items-center">
                                        <input
                                            className="h-5 w-5"
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            checked={newP.gender === 'male'}
                                            onChange={handleOnChange}
                                        />
                                        <span>Male</span>
                                    </label>
                                    <label className="space-x-4 flex items-center">
                                        <input
                                            className="w-5 h-5"
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            checked={newP.gender === 'female'}
                                            onChange={handleOnChange}
                                        />
                                        <span>Female</span>
                                    </label>
                                </div>

                                <label className='text-md font-bold'>Date</label>
                                <input type="date" name="dob"
                                    className='border-black border-2 rounded w-full my-2 p-2 text-md'
                                    placeholder='Date of Birth'
                                    value={newP.dob.toDate().toISOString().substr(0, 10)}
                                    onChange={handleOnChange} />

                                <label className='text-md font-bold'>Email</label>
                                <input type="text" name="email"
                                    className='border-black border-2 rounded w-full my-2 p-2 text-md'
                                    placeholder='Email'
                                    value={newP.email}
                                    onChange={handleOnChange} />
                                <label className='text-md font-bold'>Address</label>
                                <input type="text"
                                    className='border-black border-2 rounded w-full my-2 p-2 text-md'
                                    placeholder='Address' name="address"
                                    value={newP.address}
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