import { faCircleInfo, faDollar, faInfo, faInfoCircle, faMoneyBill, faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BillProps } from "../../../models/Bill";

export default function BillCard({ bill, refetch }: BillProps & { refetch: () => void }) {

    return (
        <div className="w-full flex justify-between items-center font-semibold text-md">
            <div className="w-full rounded-md border-2 border-black flex justify-between items-center text-black font-semibold">
                <div className=" w-full flex justify-start">
                    <div className="p-2 w-1/12">
                        {bill.patient.name}
                    </div>
                    <div className="w-1/12 flex justify-center items-center">
                        {bill.paymentDate !== null ? (
                            <p>{bill.paymentDate.toDate().toDateString()}</p>
                        ) : (
                            "Unpaid"
                        )}
                    </div>
                    <div className="w-1/12 flex flex-col justify-center items-center ">
                        {bill.items.room.number}
                    </div>
                    <div className="w-1/12 flex justify-center items-center ">
                        {bill.date?.toDate().toDateString()}
                    </div>
                    <div className="w-1/12 flex justify-center items-center ">
                        {calculateTotal({ bill })}
                    </div>
                </div>
                <div className="w-1/12 flex justify-center">
                    <div className="p-2">
                        <button className="bg-green-500 rounded-md text-white font-semibold  p-2">
                            <FontAwesomeIcon
                                icon={faDollar}
                                style={{ fontSize: 20, color: "white" }}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function calculateTotal({ bill }: BillProps) {
    let total = 0
    const currDate = new Date()
    const billDate = bill.date?.toDate()
    if (billDate) {
        const timeDifference = currDate.getTime() - billDate.getTime();
        const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        total = bill.items.room.price * dayDifference
    }
    return total
}