import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/app"
import { deleteUser } from "firebase/auth"
import "firebase/firestore"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, FieldValue, Firestore, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { User, UserProps } from "../../models/User";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };

// Initialize Firebase
// if(!getApps.length){
//     initializeApp(firebaseConfig)
// }
const app = initializeApp(firebaseConfig);
export const initFirebase = () => {
    return app;
}
// const analytics = getAnalytics(app);


export const FirebaseAuth = getAuth()
const firestore = getFirestore()
export const SignUp = async ({ user }: UserProps) => {
    const auth = getAuth()

    const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
    );

    const uid = userCredential.user.uid;
    user.id = uid;

    const userDocRef = doc(firestore, 'users', uid);
    await setDoc(userDocRef, user);
}

export const SignIn = async (email: any, pass: any) => {
    try {
        const userCollectionRef = collection(firestore, 'users');
        const q = query(userCollectionRef, where('email', '==', email), where('password', '==', pass));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data() as User;

            if (userData.status !== 'Approved') {
                console.log("User not approved");
                return "User Not Approved"
            } else {
                const userCredential = await signInWithEmailAndPassword(FirebaseAuth, email, pass)
                const { uid } = userCredential.user;
                return userData
            }
        } else {
            console.log("User not found");
            return "User Not Found"
        }
    } catch (error) {
        console.log("Error signing in:", error);
    }
    return null
}

export const SignOut = async () => {
    const auth = getAuth()
    await signOut(auth)
}

export const GetUser = async (userId:any)=>{
    const userDoc = await getDoc(doc(firestore, "users", userId));
    if(userDoc.exists()){
        return userDoc.data()
    }
}

export const getUserRoleFromFirestore = async (userId: any) => {

    const userDoc = await getDoc(doc(firestore, "users", userId));
    if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.role;
    }
};


export const GetAllStaff = async () => {
    const collectionRef = collection(firestore, "users")
    const roleQuery = query(collectionRef, where("role", "!=", "Admin"));
    try {
        const data = await getDocs(roleQuery)
        if (!data.empty) {
            return data;
        }
    } catch (error) {

    }
    return null
}

export const GetAllDoctor = async () => {
    const collectionRef = collection(firestore, "users")
    const q = query(collectionRef, where("role", "==", "Doctor"))
    try {
        const data = await getDocs(q)
        if (!data.empty) {
            return data;
        }
    } catch (error) {

    }
    return null
}

export const UpdateStaff = async (user : User) => {
    try {
        const staffDocRef = doc(firestore, 'users', user.id)
        await setDoc(staffDocRef, user, { merge: true })
    } catch (error) {

    }
}

export const deleteStaff = async ({ user }: UserProps) => {
    try{
        const staffDocRef = doc(firestore, 'users', user.id)
        await deleteDoc(staffDocRef)
    }catch(error){

    }
}