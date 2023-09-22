'use client'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserProps } from "../../../models/User";
import { deleteStaff } from "../../firebase/clientApp";

export default function DeleteStaff({ user, refetch }: UserProps & { refetch: () => void }) {

    const handleDelete = async(e: any) => {
        await deleteStaff({user})
        refetch()
        // toast.error("Login Failed", { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 })
    }

    return (
        <button onClick={handleDelete} className="bg-red-500 rounded-md text-white font-semibold my-2 p-3">
            <FontAwesomeIcon
                icon={faTrashCan}
                style={{ fontSize: 20, color: "white" }}
            />
        </button>
    );
}