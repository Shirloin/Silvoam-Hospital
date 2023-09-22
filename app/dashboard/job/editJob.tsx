'use client'
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Ambulance } from "../../../models/Ambulance"
import { JobConstructor, JobProps } from "../../../models/Job"
import { Bed, BedConstructor, BedProps, Room, RoomProps } from "../../../models/Room"
import { AddBedToRoom, CreateBed, GetDataWithTerm, GetOneData, GetRoom, RemoveBedFromRoom, UpdateAmbulance, UpdateRoom } from "../../firebase/firestore"
import { UpdateJob } from "../../firebase/jobFirestore"
import { MinBed, PlusBed } from "../../firebase/roomFirestore"

export default function EditJob({ job, refetch }: JobProps & { refetch: () => void }) {

    const [bed, setBed] = useState<Bed>(BedConstructor(job.room.number))
    const [newBed, setNewBed] = useState<Bed>(BedConstructor(job.newRoom))

    const handleClick = async (e: any) => {
        e.preventDefault()

        const newRoom = await GetRoom(job.newRoom)

        job.status = "Complete"
        if (job.category === "Add Bed") {
            job.room.bed = job.room.bed + 1
            const room = job.room
            await AddBedToRoom(job.room.id, bed)
            await PlusBed(job.room.number)
        }
        else if (job.category === "Move Bed" && newRoom) {
            await AddBedToRoom(newRoom.id, newBed)
            await RemoveBedFromRoom(job.room.id, job.bed)
            await MinBed(job.room.number)
            await PlusBed(job.newRoom)
        }
        else if(job.category === "Remove Bed"){
            await RemoveBedFromRoom(job.room.id, job.bed)
            await MinBed(bed.number)
        }
        else if(job.category === "Pick Up"){
            job.ambulance.status = "Available"
            const ambulance = job.ambulance as Ambulance
            await UpdateAmbulance({ambulance})
        }
        await UpdateJob({ job })
        refetch()
        toast.success('Job Complete', { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 });
    }

    return (
        <>
            <button onClick={handleClick} className="bg-green-500 rounded-md text-white font-semibold my-2 p-3">Complete</button>
        </>
    )
}