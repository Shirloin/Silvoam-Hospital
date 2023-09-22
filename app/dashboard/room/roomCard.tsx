'use client'
import { auth } from "firebase-admin";
import { useContext, useEffect, useState } from "react";
import { Bed, BedProps, BedsProps, RoomProps } from "../../../models/Room";
import { AuthContext } from "../../context/authContext";
import { GetBed } from "../../firebase/firestore";
import AddBed from "./addBed";
import BedCard from "./bedCard";

export default function RoomCard({ room, bed, onRoomHandle, onBedHandle }: RoomProps & BedsProps & { onRoomHandle: () => void } & { onBedHandle: () => void }) {
    const [beds, setBeds] = useState<Bed[]>([]);
    const {authState, setAuthState} = useContext(AuthContext)
    const fetchBeds = async () => {
        const data = await GetBed(room.id)
        if (data) {
            const bedData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Bed[]
            setBeds(bedData)
        }
    };
    useEffect(() => {
        fetchBeds();
    }, []);

    return (
        <div className="rounded-xl min-w-96 sm:w-[500px] md:w-[350px] lg:w-[400px] xl:[420px] h-auto border-2 p-2 bg-blue-200">
            <div className="relative w-full flex flex-col justify-center items-center font-bold text-xl">
                <div className="w-full flex justify-center items-center">
                    <h1 className="w-full flex justify-center items-center ">{room.number}</h1>
                </div>
                <div className="absolute top-0 right-0">
                    {
                        authState.role === "Admin"?(
                            <AddBed room={room} onBedHandle={onBedHandle} />
                        ):null
                    }
                </div>
                {room.type}|
                {room.bed}
            </div>
            <div className="relative min-w-screen flex justify-center items-center">
                <div className="min-w-screen h-full grid grid-cols-2 gap-x-16 gap-y-10 m-10">
                    {
                        beds.map((b, index) => (
                            <BedCard
                                key={b.id}
                                onBedHandle={onBedHandle}
                                onRoomHandle={onRoomHandle}
                                index={index + 1}
                                bed={b}
                                room={room}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}