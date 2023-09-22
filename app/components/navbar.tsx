'use client'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { FirebaseAuth, GetUser, getUserRoleFromFirestore } from "../firebase/clientApp";
import SignInComponent from "./auth/signin";
import SignInModal from "./auth/signin";
import SignOutComponent from "./auth/signout";
import SignUpComponent from "./auth/signup";
import SignUpModal from "./auth/signup";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    faBell,
    faAmbulance,
    faAnchor,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../../models/User";
import { AuthContext } from "../context/authContext";
import { ppid } from "process";

export default function Navbar() {

    const [userEmail, setUserEmail] = useState('')
    const [hasLogIn, setHasLogin] = useState(false)
    const [userRole, setUserRole] = useState('')
    const { authState, setAuthState } = useContext(AuthContext);
    const auth = getAuth()
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
    //         console.log("abc")
    //         if (user) {
    //             const authUser = await GetUser(user.uid);
    //             setAuthState(authUser);
    //             setHasLogin(true);
    //             setUserEmail(authState.name);
    //             setUserRole(authState.role);
    //         } else {
    //             setAuthState({} as User);
    //             setHasLogin(false);
    //             setUserEmail('');
    //             setUserRole('');
    //         }
    //     });
    //     return () => {
    //         unsubscribe();
    //     };
    // }, [auth]);

    useEffect(() => {
        console.log("abc")
        if (authState) {
            console.log("def")
            setHasLogin(true)
            setUserEmail(authState.name)
            setUserRole(authState.role)
        }
        else {
            setHasLogin(false);
            setUserEmail('');
            setUserRole('');
        }
    }, [authState])


    return (
        <div className="bg-white border-solid border-b-2 border-black">
            <div className="relative">
                <div className="px-10 flex justify-between items-center h-24 w-full text-2xl">
                    <div className="flex flex-row items-center gap-4 h-full">
                        <Link href="/">CX23-1</Link>
                        {
                            hasLogIn ? (
                                <>
                                    {
                                        userRole === "Doctor" || userRole === "Nurse" || userRole === "Admin" ? (
                                            <Link href="/dashboard/patient">Patient</Link>
                                        ) : null
                                    }{
                                        userRole === "Nurse" || userRole === "Admin" ? (
                                            <Link href="/dashboard/room">Room</Link>
                                        ) : null
                                    }{
                                        userRole === "Doctor" || userRole === "Nurse" ? (
                                            <Link href="/dashboard/appointment">Appointment</Link>
                                        ) : null
                                    }{
                                        userRole === "Admin" ? (
                                            <>
                                                <Link href="/dashboard/ambulance">Ambulance</Link>
                                                <Link href="/dashboard/staff">Staff</Link>
                                                <Link href="/dashboard/bill">Bill</Link>
                                            </>
                                        ) : null
                                    }{
                                        userRole === "Pharmacist" ? (
                                            <Link href="/dashboard/medicine">Medicine</Link>
                                        ) : null
                                    }{
                                        userRole === "Doctor" || userRole === "Pharmacist" ? (
                                            <Link href="/dashboard/prescription">Prescription</Link>
                                        ) : null
                                    }{
                                        userRole !== "Admin" ? (
                                            <Link href="/dashboard/job">Job</Link>
                                        ) : null
                                    }
                                </>
                            ) : null
                        }
                        <ToastContainer />
                    </div>
                    <div className="h-full flex flex-col items-end justify-center">
                        <div className="h-full flex justify-center gap-4 items-center">
                            <Link href="/dashboard/notification">
                                <FontAwesomeIcon
                                    icon={faBell}
                                    style={{ fontSize: 20, color: "black" }}
                                />
                            </Link>
                            Hello {userEmail} | {userRole}
                        </div>
                        <div className="h-full w-full flex justify-end items-center gap-4">
                            {!hasLogIn ? (<>
                                <SignInComponent />
                                <SignUpComponent />
                            </>) : <SignOutComponent />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}