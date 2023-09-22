'use client'
import { JobProps } from "../../../models/Job";
import { calculateDate, calculateTime } from "../appointment/appointmentCard";
import EditJob from "./editJob";

export default function JobCard({ job, refetch }: JobProps & { refetch: () => void }) {

    let color = "bg-white"
    if (job.status === "Complete") {
        color = "bg-green-200"
    }
    else if (job.status === "Unfinished") {
        color = "bg-blue-200"
    }
    else if (job.status === "Late") {
        color = "bg-red-400"
    }

    return (
        <>
            <div className={`w-full rounded-md border-2 border-black flex justify-between items-center ${color}`}>
                <div className="w-full px-4 flex justify-between items-center ">
                    <div className=" w-full flex justify-start">
                        <div className="w-60 flex flex-col justify-center">
                            <div className="font-semibold text-xl">
                                {job.name}
                            </div>
                        </div>
                        <div className="w-36 px-2 flex justify-center items-center">
                            <div className="text-black font-semibold">
                                {job.category}
                            </div>
                        </div>
                        <div className="w-36 px-2 flex justify-center items-center">
                            <div className="text-black font-semibold">
                                {job.patient.name ? job.patient.name : "[Empty]"}
                            </div>
                        </div>
                        <div className="w-36 px-2 flex flex-col justify-center items-center">
                            <div className="text-black font-semibold">
                                {job.assignedDate ? calculateDate(job.assignedDate): "Empty Date"}
                            </div>
                            <div className="text-black font-semibold">
                                {job.assignedDate ? calculateTime(job.assignedDate):null}
                            </div>
                        </div>
                        <div className="w-36 px-2 flex flex-col justify-center items-center">
                            <div className="text-black font-semibold">
                                {job.dueDate ? calculateDate(job.dueDate): "Empty Date"}
                            </div>
                            <div className="text-black font-semibold">
                                {job.dueDate ? calculateTime(job.dueDate) : null}
                            </div>
                        </div>
                        <div className="w-36 px-2 flex justify-center items-center">
                            <div className="text-black font-semibold">
                                {job.room ? job.room.number : "[Empty]"}
                            </div>
                        </div>
                    </div>
                    {
                        job.status === "Unfinished" ? (
                            <div className="w-24 flex justify-center">
                                <EditJob job={job} refetch={refetch} />
                            </div>
                        ):null
                    }
                    {
                        job.status === "Complete" ? "Complete":null
                    }
                    {
                        job.status === "Late" ? "Late": null
                    }
                </div>
            </div>
        </>
    )
}