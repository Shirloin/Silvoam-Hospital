'use client'
import { useContext, useEffect, useState } from "react";
import { Bed, BedProps, Room } from "../../../models/Room";
import Search from "../../components/search";
import { AuthContext } from "../../context/authContext";
import { GetData } from "../../firebase/firestore";
import AddRoom from "./addRoom";
import RoomCard from "./roomCard";

export default function RoomList() {

    const [rooms, setRoom] = useState<Room[]>([])
    const [filteredRooms, setFilteredRooms] = useState<Room[]>([])
    const [beds, setBed] = useState<Bed[]>([])
    const {authState, setAuthState} = useContext(AuthContext)
    

    const fetchRoom = async () => {
        const data = await GetData('rooms');
        if (data) {
            const roomData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Room[]
            const sortedRooms = roomData.sort((a, b) => a.number.localeCompare(b.number));
            setRoom(sortedRooms);
            setFilteredRooms(sortedRooms)
        }
        else{
            setFilteredRooms([])
        }
    };

    const fetchBed = async () => {
        const data = await GetData('beds');
        if (data) {
            const bedData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Bed[]
            setBed(bedData);
        }
        else{
            setBed([])
        }
    }
    const handleRoom = () => {
        fetchRoom();
    }
    const handleBed = () => {
        fetchBed();
    }
    useEffect(() => {

        fetchRoom();
        fetchBed();
    }, []);

    const handleSearch = (searchTerm: string) => {
        const filtered = rooms.filter((room) =>
            room.number.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const sortedRooms = filtered.sort((a, b) => a.number.localeCompare(b.number));
        setFilteredRooms(sortedRooms);
    };

    return (
        <>
            <div className="bg-white">
                <div className="relative border-b-2 border-black">
                    <div className="px-10 flex justify-between items-center gap-4 h-24 w-full text-2xl">
                        {
                            authState.role === "Admin"? (
                                <AddRoom onRoomHandle={handleRoom} />
                            ):null
                        }
                        <Search onSearch={handleSearch} />
                    </div>
                </div>
                <div className="relative min-w-screen flex justify-center items-center">
                    <div className="min-w-screen grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mx-10 my-10">
                        {
                            filteredRooms.map((room) => (
                                <RoomCard
                                    room={room}
                                    bed={
                                        beds.filter(
                                            (bed) => room.number === bed.number
                                        )
                                    }
                                    key={room.id}
                                    onRoomHandle={handleRoom}
                                    onBedHandle={handleBed}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>

    );
}