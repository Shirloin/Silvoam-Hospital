import { collection, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore"
import { Patient } from "../../models/Patient"
import { Bed, Room } from "../../models/Room"
import { initFirebase } from "./clientApp"

const app = initFirebase()
const firestore = getFirestore(app)

export const GetRoomByType = async (type: string) => {
    try {
        const querySnapshot = await getDocs(
            query(collection(firestore, "rooms"), where("type", "==", type))
        );
        if (!querySnapshot.empty) {
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Room[];

            for (const room of data) {
                const bedsCollectionRef = collection(
                    firestore,
                    "rooms",
                    room.id,
                    "beds"
                );
                const bedsSnapshot = await getDocs(bedsCollectionRef);

                let emptyBedData: Bed | null = null;
                bedsSnapshot.forEach((bedDoc) => {
                    const bedData = bedDoc.data() as Bed;
                    console.log(bedData)
                    if (bedData.patient === null || Object.keys(bedData.patient).length ===0) {
                        emptyBedData = bedData;
                    }
                });
                if (emptyBedData) {
                    return { room, bed: emptyBedData };
                }
            }
        }
    } catch (error) {
        console.error("Error retrieving documents: ", error);
    }
    return null;
};

export const MinBed = async (number: string) => {
    try {
        const collectionRef = collection(firestore, "rooms");
        const q = query(collectionRef, where("number", "==", number));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const dataRef = querySnapshot.docs[0].ref
            const data = querySnapshot.docs[0].data() as Room
            const updateData = { "bed": data.bed - 1 }
            await updateDoc(dataRef, updateData)

        }
    } catch (error) {

    }
}

export const PlusBed = async (number: string) => {
    try {
        const collectionRef = collection(firestore, "rooms");
        const q = query(collectionRef, where("number", "==", number));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const dataRef = querySnapshot.docs[0].ref
            const data = querySnapshot.docs[0].data() as Room
            const updateData = { "bed": data.bed + 1 }
            await updateDoc(dataRef, updateData)

        }
    } catch (error) {

    }
}