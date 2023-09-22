import { UserProps } from "../../../models/User";
import DeleteStaff from "./deleteStaff";
import EditStaff from "./editStaff";

export default function StaffCard({ user, refetch }: UserProps & { refetch: () => void }) {

    let color
    if(user.status==='Approved'){
        color = "bg-green-100"
    }
    else{
        color = "bg-red-100"
    }

    return (
        <div className={`w-full rounded-md border-2 border-black flex justify-between items-center ${color}`}>
            <div className=" w-full flex justify-start">
                <div className="p-2 w-48  flex flex-col justify-center">
                    <div className="font-semibold text-xl">
                        {user.name}
                    </div>
                    <div className="text-md text-gray-500">
                        {user.email}
                    </div>
                </div>
                <div className="w-36 flex justify-center items-center font-semibold">
                    {user.role}
                </div>
                <div className="w-36 flex flex justify-center items-center ">
                    <div className=" flex flex-col justify-center">
                        <div className="text-black font-semibold">
                            {user.startShift} - {user.endShift}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-24 flex justify-start">
                <div className="p-2">
                    <EditStaff refetch={refetch} user={user} />
                </div>
            </div>
            <div className="w-24 flex justify-start">
                <div className="p-2">
                    <DeleteStaff user={user} refetch={refetch}/>
                </div>
            </div>
        </div>
    );
}