'use client'
import { getAuth } from "firebase/auth"
import { useEffect, useState } from "react"
import { Notification } from "../../../models/Notification"
import { GetNotification } from "../../firebase/notificationFirestore"
import NotificationCard from "./notificationCard"

export default function Notification(){

    const [notif, setNotif] = useState<Notification[]>([])

    const fetch = async () => {

        const auth = getAuth()
        const user = auth.currentUser
        if(user){
            let data = await GetNotification(user.uid)
            if(data){
                setNotif(data)
            }
        }
    }

    const refetch = ()=>{
        fetch()
    }

    useEffect(()=>{
        fetch()
    }, [])

    return (
        <>
            <div className="bg-white">
                <div className="relative min-w-screen h-full flex justify-center items-center">
                    <div className="min-w-screen sm:min-w-screen h-full grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mx-10 my-10">
                        {notif.map((e) => (
                            <NotificationCard key={e.id} notification={e} refetch={refetch} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}