'use client'
import { Bed, BedConstructor, RoomProps } from "../../../models/Room";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CreateBed, UpdateRoom } from "../../firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Patient } from "../../../models/Patient";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Job, JobConstructor } from "../../../models/Job";
import { CreateJob } from "../../firebase/jobFirestore";
import { Notification, NotificationConstructor } from "../../../models/Notification";
import { CreateNotification } from "../../firebase/notificationFirestore";
import { GetStaff } from "../../firebase/staffFirestore";
import { Ambulance } from "../../../models/Ambulance";
import { User } from "../../../models/User";
import { UpdateStaff } from "../../firebase/clientApp";


export default function AddBed({ room, onBedHandle }: RoomProps & { onBedHandle: () => void }) {

    const [bed, setBed] = useState<Bed>(BedConstructor(room.number))
    const [job, setJob] = useState<Job | null>(null);
    const [notification, setNotification] = useState<Notification | null>(null)
    const [user, setUser] = useState<User>({} as User)

    const handleClick = async (e: any) => {
        e.preventDefault()
        if (room.bed !== room.capacity && job && notification) {
            try {
                user.jobWeight = user.jobWeight + 1;
                await UpdateStaff(user)
                await CreateJob({ job })
                await CreateNotification({ notification })
                toast.success(user.name + " will to the job", { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 })
            } catch (error) {
                console.error('Error during add bed:', error);
            }
        }
        else {
            toast.info('Room has the maximum bed capacity', { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 });
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const user = await GetStaff("Cleaning Service");
            if (user) {
                let date = new Date();
                date.setDate(date.getDate() + 1);
                setUser(user)
                setJob(JobConstructor("Making The Bed", "Add Bed", {} as Patient, Timestamp.fromDate(date), room, user.id, "", "", {} as Ambulance));
                setNotification(NotificationConstructor("Making The Bed To Room " + room.number, user.id))
            }
        };

        fetchData();
    },);

    return (
        <>
            {/* <ToastContainer /> */}
            <button onClick={handleClick}>
                <FontAwesomeIcon
                    icon={faPlus}
                    style={{ fontSize: 30, color: "white" }}
                />
            </button>
        </>

    );
}