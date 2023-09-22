import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { NotificationProps } from "../../../models/Notification";
import { RemoveNotification } from "../../firebase/notificationFirestore";

export default function NotificationCard({ notification, refetch }: NotificationProps & { refetch: () => void }) {

    const handleClick = async (e: any) => {
        e.preventDefault()
        await RemoveNotification({notification})
        refetch()
        toast.success('Delete Success', { position: toast.POSITION.TOP_RIGHT, autoClose: 500 });
    }

    return (
        <>
            <div className="rounded-xl min-w-96 sm:w-[500px] md:w-[300px] lg:w-[350px] xl:[400px] h-40 border-2 p-2 bg-blue-200">
                <div className="relative p-2 w-full h-full flex justify-between">
                    <div className="flex flex-col justify-evenly">
                        {notification.name}
                    </div>
                    <div className="absolute top-0 right-0">
                        <button onClick={handleClick}>
                            <FontAwesomeIcon
                                icon={faTrash}
                                style={{ fontSize: 20, color: "red" }}
                            />
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}