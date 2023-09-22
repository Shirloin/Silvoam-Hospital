'use client'
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Ambulance } from "../../../models/Ambulance";
import { Job, JobConstructor } from "../../../models/Job";
import { Notification, NotificationConstructor } from "../../../models/Notification";
import { Patient } from "../../../models/Patient";
import { BedProps, RoomProps } from "../../../models/Room";
import { User } from "../../../models/User";
import { UpdateStaff } from "../../firebase/clientApp";
import { CreateJob } from "../../firebase/jobFirestore";
import { CreateNotification } from "../../firebase/notificationFirestore";
import { MinBed } from "../../firebase/roomFirestore";
import { GetStaff } from "../../firebase/staffFirestore";

export default function EraseBed({ bed, room, closeModal }: & BedProps & RoomProps & { closeModal: () => void }) {

    const [job, setJob] = useState<Job | null>(null);
    const [notification, setNotification] = useState<Notification | null>(null)
    const [user, setUser] = useState<User>({} as User)
    const handleRemove = async (e: any) => {
        e.preventDefault()
        try {
            if (job && notification) {
                user.jobWeight = user.jobWeight + 1;
                await UpdateStaff(user)
                await CreateJob({ job })
                await CreateNotification({ notification })
                toast.success(user.name + " will to the job", { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 });
            }
        } catch (error) {

        }
        closeModal()
    }

    useEffect(() => {
        const fetchData = async () => {
            const user = await GetStaff("Cleaning Service");
            if (user) {
                let date = new Date();
                date.setDate(date.getDate() + 1);
                setUser(user)
                setJob(JobConstructor("Remove Bed", "Remove Bed", {} as Patient, Timestamp.fromDate(date), room, user.id, "", bed.id, {} as Ambulance));
                setNotification(NotificationConstructor("Remove Bed From Room " + room.number, user.id))
            }
        };

        fetchData();
    },);

    return (
        <>
            <button onClick={handleRemove} className='bg-blue-500 hover:bg-blue-600 rounded p-2 w-full my-2 text-md font-bold text-white '>Remove Bed</button>
        </>
    )
}