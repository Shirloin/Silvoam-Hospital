import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore"
import { Notification, NotificationProps } from "../../models/Notification"
import { initFirebase } from "./clientApp"

const app = initFirebase()
const firestore = getFirestore(app)

export const GetNotification = async(id:string)=>{
    try {
        const collectionRef = collection(firestore, 'notifications');
        const q = query(collectionRef, where("userid", "==", id));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })) as Notification[]
        return data;
    } catch (error) {
        
    }
}

export const CreateNotification = async({notification}: NotificationProps)=>{
    try{
        const collectionRef =  collection(firestore, 'notifications')
        const newDocRef = await addDoc(collectionRef, notification)
        await setDoc(newDocRef, {id: newDocRef.id}, {merge:true})
    }catch(error){
        console.error('Error saving Notification: ', error);
    }
}

export const RemoveNotification = async({notification}: NotificationProps)=>{
    try {
        const docRef = doc(firestore, "notifications", notification.id)
        await deleteDoc(docRef)
    } catch (error) {
        
    }
}