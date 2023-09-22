import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore"
import { initFirebase } from "./clientApp";
import { Patient, PatientProps } from "../../models/Patient";
import { Bed, BedProps, Room, RoomProps } from "../../models/Room";
import { AppointmentProps } from "../../models/Appointment";
import { AmbulanceProps, UsedAmbulanceProps } from "../../models/Ambulance";

const app = initFirebase()
const firestore = getFirestore(app)
export const GetData = async (collectionName: any) => {
    try {
        const querySnapshot = await getDocs(collection(firestore, collectionName));
        if (!querySnapshot.empty) {
            return querySnapshot
        }
    } catch (error) {
        console.error('Error retrieving documents: ', error);
    }
    return null
}

export const GetDataWithTerm = async (collectionName: string, attributes: string, term: string) => {
    try {
        const userCollectionRef = collection(firestore, collectionName);
        const q = query(userCollectionRef, where(attributes, "==", term));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return querySnapshot
        }
    } catch (error) {

    }
}

export const GetOneData = async (collectionName: string, id: string) => {
    try {
        const docRef = doc(firestore, collectionName, id)
        const docSnapshot = await getDoc(docRef)
        if (docSnapshot.exists()) {
            const data = docSnapshot.data()
            return data
        }
        else {
            return null
        }
    } catch (error) {

    }
}

export const GetAppointment = async(id:string)=>{
    try {
        console.log(id)
        const userCollectionRef = collection(firestore, "appointments");
        const q = query(userCollectionRef, where("doctor.id", "==", id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return querySnapshot
        }
    } catch (error) {

    }
}

export const CreatePatient = async ({ patient }: PatientProps) => {
    try {
        const patientCollectionRef = collection(firestore, 'patients')
        const newDocRef = await addDoc(patientCollectionRef, patient)
        await setDoc(newDocRef, { id: newDocRef.id }, { merge: true })
        console.log("Patient Added Successfully")
    } catch (error) {
        console.error('Error saving patient: ', error);
    }
}

export const UpdatePatient = async ({ patient }: PatientProps) => {
    try {
        const patientDocRef = doc(firestore, 'patients', patient.id)
        await setDoc(patientDocRef, patient, { merge: true })
        console.log("Patient Saved Successfully")
    } catch (error) {
        console.error('Error saving patient: ', error);
    }
}

export const GetRoom = async (roomNumber: string) => {
    try {
        const q = query(collection(firestore, 'rooms'), where("number", '==', roomNumber))
        const data = await getDocs(q)
        if (!data.empty) {
            const roomData = data.docs[0].data()

            const newRoom: Room = {
                id: roomData.id,
                number: roomData.number,
                type: roomData.type,
                capacity: roomData.capacity,
                price: roomData.price,
                bed: roomData.bed,
                beds: roomData.beds
            };
            return newRoom
        }
        return null
    } catch (error) { }
}

export const CreateRoom = async ({ room }: RoomProps) => {
    try {
        const roomsCollectionRef = collection(firestore, 'rooms')
        const newDocRef = await addDoc(roomsCollectionRef, room)
        await setDoc(newDocRef, { id: newDocRef.id }, { merge: true })
    } catch (error) {
        console.error('Error saving room: ', error);
    }
}

export const UpdateRoom = async ({ room }: RoomProps) => {
    try {
        const roomDocRef = doc(firestore, 'rooms', room.id)
        await setDoc(roomDocRef, room, { merge: true })
    } catch (error) {
        console.error('Error saving room: ', error);
    }
}

export const CreateBed = async (bed: Bed) => {
    try {
        const bedCollectionRef = collection(firestore, 'beds')
        const newDocRef = await addDoc(bedCollectionRef, bed)
        await setDoc(newDocRef, { id: newDocRef.id }, { merge: true })
        console.log("Bed Added Successfully")
    } catch (error) {
        console.error('Error saving bed: ', error);
    }
}

export const GetBed = async(roomId:string)=>{
    try {
        const collectionRef = collection(firestore, "rooms", roomId, "beds")
        const data = await getDocs(collectionRef)
        if(!data.empty){
            return data
        }
    } catch (error) {
        
    }
    return null
}

export const AddBedToRoom = async (roomId: string, bed: Bed) => {
    try {
        const roomDocRef = doc(firestore, 'rooms', roomId);
        const bedsCollectionRef = collection(roomDocRef, 'beds');

        const newBedDocRef = doc(bedsCollectionRef);
        bed.id = newBedDocRef.id;
        await setDoc(newBedDocRef, bed);

        console.log("Bed Added Successfully to the room")
    } catch (error) {
        console.error('Error adding bed to room: ', error);
    }
}

export const RemoveBedFromRoom = async (roomId: string, bedId:string)=>{
    try {
        const roomRef = doc(firestore, "rooms", roomId)
        const bedRef = doc(roomRef, "beds", bedId)
        await deleteDoc(bedRef)
    } catch (error) {
        
    }
}

export const UpdateBed = async (roomId:string, { bed }: BedProps) => {
    try {
        const roomRef = doc(firestore, "rooms", roomId)
        const bedDocRef = doc(roomRef, 'beds', bed.id)
        await setDoc(bedDocRef, bed, { merge: true })
    } catch (error) {
        console.error('Error saving room: ', error);
    }
}


export const CreateAppointment = async ({ appointment }: AppointmentProps) => {
    try {
        const appointmentCollectionRef = collection(firestore, "appointments")
        const newDocRef = await (addDoc(appointmentCollectionRef, appointment))
        await setDoc(newDocRef, { id: newDocRef.id }, { merge: true })
        console.log("Appointment added successfully")
    } catch (error) {
        console.log("Error adding appointment " + error)
    }
}

export const UpdateAppointment = async ({ appointment }: AppointmentProps) => {
    try {
        const appointmentDocRef = doc(firestore, 'appointments', appointment.id)
        await setDoc(appointmentDocRef, appointment, { merge: true })
    } catch (error) {
        console.error('Error saving room: ', error);
    }
}

export const UpdateQueue = async (num: number) => {
    try {
        const collectionRef = collection(firestore, "appointments");

        // Create a query to retrieve the appointments with a queue number greater than 2
        const q = query(collectionRef, where("queue", ">", num));
        const snapshot = await getDocs(q);

        // Prepare the update operations for each document
        const updateOperations = snapshot.docs.map((doc) => {
            const updatedQueue = doc.data().queue - 1;
            return updateDoc(doc.ref, { queue: updatedQueue });
        });

        // Execute the bulk write operation
        await Promise.all(updateOperations);
        console.log("Queue updated successfully");
    } catch (error) {
        console.error("Error updating queue:", error);
    }
}

export const UpdateStatus = async () => {
    try {
        const collectionRef = collection(firestore, "appointments");
        const q = query(collectionRef, where("status", "==", "Skipped"));
        const snapshot = await getDocs(q);

        const updateOperations = snapshot.docs.map((doc) => {
            return updateDoc(doc.ref, { status: "Queued" });
        });
        await Promise.all(updateOperations);
        console.log("Queue updated successfully");
    } catch (error) {
        console.error("Error updating queue:", error);
    }
}

export const DeleteAppointment = async ({ appointment }: AppointmentProps) => {
    try {
        const appointmentDocRef = doc(firestore, "appointments", appointment.id)
        await deleteDoc(appointmentDocRef)
    } catch (error) {

    }
}

export const CreateAmbulance = async ({ ambulance }: AmbulanceProps) => {
    try {
        const ambulanceCollectionRef = collection(firestore, "ambulances");
        const newDocRef = await (addDoc(ambulanceCollectionRef, ambulance))
        await setDoc(newDocRef, { id: newDocRef.id }, { merge: true })
    } catch (error) {

    }
}

export const UpdateAmbulance = async ({ ambulance }: AmbulanceProps) => {
    try {
        const appointmentDocRef = doc(firestore, 'ambulances', ambulance.id)
        await setDoc(appointmentDocRef, ambulance, { merge: true })
    } catch (error) {

    }
}

export const CreateUsedAmbulance = async ({ usedAmbulance }: UsedAmbulanceProps) => {
    try {
        const ambulanceCollectionRef = collection(firestore, "usedAmbulance");
        const newDocRef = await (addDoc(ambulanceCollectionRef, usedAmbulance))
        await setDoc(newDocRef, { id: newDocRef.id }, { merge: true })
    } catch (error) {

    }
}

