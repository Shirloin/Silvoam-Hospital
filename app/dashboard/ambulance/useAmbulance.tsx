'use client'
import { useContext, useEffect, useState } from "react";
import { AmbulanceProps, UsedAmbulance, UsedAmbulanceConstructor } from "../../../models/Ambulance";
import { DriverContext } from "../../context/driverContext";
import { PatientContext } from "../../context/patientContext";
import { CreateUsedAmbulance, UpdateAmbulance, UpdateBed } from "../../firebase/firestore";
import { handleFormClick } from "../../utilities/GlobalFunction";
import { GetStaff } from "../../firebase/staffFirestore";
import PatientDropdown from "../appointment/patientDropdown";
import DriverDropdown from "./driverDropdown";
import { GetRoomByType } from "../../firebase/roomFirestore";
import { toast } from "react-toastify";
import { Bed, Room } from "../../../models/Room";
import { Job, JobConstructor } from "../../../models/Job";
import { Notification, NotificationConstructor } from "../../../models/Notification";
import { Timestamp } from "firebase/firestore";
import { CreateJob } from "../../firebase/jobFirestore";
import { CreateNotification } from "../../firebase/notificationFirestore";
import { User } from "../../../models/User";
import { UpdateStaff } from "../../firebase/clientApp";

export default function UseAmbulance({ ambulance, refetch }: AmbulanceProps & { refetch: () => void }) {

    const [modal, setModal] = useState(false);
    const [usedAmbulance, setUsedAmbulance] = useState<UsedAmbulance>(UsedAmbulanceConstructor)
    const { patientState, setPatientState } = useContext(PatientContext);
    const { driverState, setDriverState } = useContext(DriverContext);

    const [job, setJob] = useState<Job | null>(null);
    const [notification, setNotification] = useState<Notification | null>(null)

    const handleClick = (e: any) => {
        e.preventDefault()
        setModal(!modal)
    }

    const handleOnChange = (e: any) => {
        const { name, value } = e.target
        let val = value
        setUsedAmbulance({ ...usedAmbulance, [name]: val })
    }

    const handleSubmit = async (e: any) => {
        const driver = await GetStaff("Driver");
        const result = await GetRoomByType("Emergency Unit");

        if (driver) {
            // console.log(result)
            if (result && result.room && result.bed) {
                const room = result.room as Room;
                const bed = result.bed as Bed;
                bed.patient = patientState
                bed.status = "yellow"
                await UpdateBed(room.id, { bed })
                ambulance.status = "Used";
                await UpdateAmbulance({ ambulance });
                await CreateUsedAmbulance({ usedAmbulance });
                let date = new Date();
                date.setHours(date.getHours() + 1);
                const job = JobConstructor("Pick Up Patient", "Pick Up", patientState, Timestamp.fromDate(date), room, driver.id, "", bed.id, ambulance)
                await CreateJob({ job })
                const notification = NotificationConstructor("Pick Up Patient " + patientState.name, driver.id)
                await CreateNotification({ notification })
                driver.jobWeight = driver.jobWeight + 1;
                await UpdateStaff(driver)
                toast.success(driver.name + " will do the job", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
            } else {
                toast.error("Bed not available", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
            }
        } else {
            toast.error("Driver not available", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            });
        }

        refetch();
        setModal(!modal);
    };
    useEffect(() => {

        setUsedAmbulance({ ...usedAmbulance, ["patient"]: patientState, ["ambulance"]: ambulance, ["driver"]: driverState })

    }, [patientState])

    return (
        <>
            <button className="bg-blue-500 rounded-md px-3 py-1 text-white" onClick={handleClick}>Use</button>
            {modal && (
                <div className='fixed inset-0 z-20 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleClick}>
                    <div className='w-[500px] flex flex-col'>
                        <div className='bg-white p-2 rounded-xl flex flex-col'>
                            <div className="px-10 py-4" onClick={handleFormClick}>
                                <label className='text-md font-bold'>Destination</label>
                                <input type="text" name="destination"
                                    className='border-black border-2 rounded w-full my-2 p-2 text-md'
                                    placeholder='Destination'
                                    value={usedAmbulance.destination}
                                    onChange={handleOnChange} />
                                <label className='text-md font-bold'>Patient</label>
                                <div className="relative">
                                    <PatientDropdown handleOnChange={handleOnChange} />
                                </div>
                                <label className='text-md font-bold'>Driver</label>
                                {/* <div className="relative">
                                    <DriverDropdown handleOnChange={handleOnChange} />
                                </div> */}
                                <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-600 rounded p-2 w-full my-2 text-md font-bold text-white '>Use Ambulance</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}