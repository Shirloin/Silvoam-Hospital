import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import { User } from "../../models/User"
import { initFirebase } from "./clientApp"

const app = initFirebase()
const firestore = getFirestore(app)

export const GetStaff = async (role:string) => {
    try {
        const querySnapshot = await getDocs(query(collection(firestore, "users"), where("role", "==", role)));
        if (!querySnapshot.empty) {
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as User[]
            data.sort((a, b)=> a.jobWeight - b.jobWeight)
            return data[0]
        }
    } catch (error) {
        console.error('Error retrieving documents: ', error);
    }
    return null
}