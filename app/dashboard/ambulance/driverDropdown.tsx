'use client'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { User } from "../../../models/User";
import { DriverContext } from "../../context/driverContext";
import { GetDataWithTerm } from "../../firebase/firestore";

export default function DriverDropdown({ handleOnChange }: { handleOnChange: (e: any) => void }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<User[]>([])
    const { driverState, setDriverState} = useContext(DriverContext);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const fetchDriver = async () => {
        const data = await GetDataWithTerm('users', 'role', 'Driver');
        if (data) {
            const d = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as User[]
            setUser(d);
        }
    };
    const filteredOptions = user.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleOptionClick = (e: any, p: any) => {
        e.preventDefault()
        setDriverState(p)
        // setPatientState(p)
        toggleDropdown()
    };
    useEffect(() => {
        fetchDriver();
    }, []);
    return (
        <>
            {isOpen === true ? (
                <input
                    type="text"
                    placeholder="Search..."
                    className="text-gray-800 py-2 px-4 rounded-md w-full text-left border-2 border-black"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            ) : (
                <div onClick={toggleDropdown} className="w-full rounded-md border-2 border-black py-3 px-2 flex justify-between items-center">
                    <h1 className="text-gray-800">{driverState.name === "" ? "Search" : driverState.name}</h1>
                    <FontAwesomeIcon
                        icon={faSearch}
                        style={{ fontSize: 20, color: "black" }}
                    />
                </div>
            )}
            {isOpen && (
                <div className="absolute z-20 w-full max-h-36 overflow-y-auto bg-white rounded-md shadow-md mt-2">
                    {filteredOptions.map((p, index) => (
                        <button
                            key={index}
                            className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                            onClick={(e: any) => handleOptionClick(e, p)}
                        >
                            {p.name}
                        </button>
                    ))}
                    {filteredOptions.length === 0 && (
                        <p className="px-4 py-2 text-gray-500">No options found.</p>
                    )}
                </div>
            )}
        </>
    );
}