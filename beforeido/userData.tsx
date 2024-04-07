import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

interface UserDocument { 
    coupleCode: number; 
    curSection: number; 
    email: string; 
    firstName: string; 
    lastName: string; 
    password: string; 
}

export async function fetchData(): Promise<UserDocument | null> {
    const authUser = auth().currentUser;

    if (!authUser) {
        throw new Error("No authenticated user found.");
    }

    try {
        const querySnapshot = await firestore()
            .collection('users')
            .where('email', '==', authUser.email)
            .get();

        if (querySnapshot.empty) {
            console.log("No documents found for current user");
            return null;
        }

        // If multiple documents are found, log a warning
        if (querySnapshot.size > 1) {
            console.warn("Multiple documents found for current user");
        }

        // Extract the first document (assuming there's only one)
        const userDocument = querySnapshot.docs[0].data() as UserDocument;
        return userDocument;
    } catch (error) {
        console.error('Error fetching user document: ', error);
        return null;
    }
}
