import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

interface CoupleDocument{ 
    docID: string, 
    user1: string, 
    user1Done: boolean, 
    user2: string | null , 
    user2Done: boolean | null, 

}

export async function fetchCoupleData(coupleCode: string): Promise<CoupleDocument | null> {
    console.log("Couple Code Before Try Block: ", coupleCode); 
    try { 
        console.log("Called fetchCoupleData with a coupleCode of ", coupleCode)
        const coupleCodeRef = firestore().collection('coupleCode').doc(coupleCode);

        const doc = await coupleCodeRef.get();

        if (doc.exists) { // If document exists... 
            console.log("doc exists")
            if (doc.data()?.hasOwnProperty("user2")) { // If they have second user, add 
                console.log("Has second user..."); 
                const coupleDocument: CoupleDocument = {
                    docID: coupleCode, 
                    user1: doc.data()?.user1, 
                    user1Done: doc.data()?.user1Done,
                    user2: doc.data()?.user2,
                    user2Done: doc.data()?.user2Done,
                }; 

                return coupleDocument; 
            } else { // Else, leave as null 
                console.log("Does not have second user..."); 
                const coupleDocument: CoupleDocument = {
                    docID: coupleCode, 
                    user1: doc.data()?.user1, 
                    user1Done: doc.data()?.user1Done,
                    user2: null, 
                    user2Done: null,
                }; 

                console.log("Returning the following from fetchCoupleData():"); 
                console.log("User 1: ", coupleDocument.user1); 
                console.log("User 1 Done: ", coupleDocument.user1Done); 
                console.log("User 2: ", coupleDocument.user2); 
                console.log("User 2 Done: ", coupleDocument.user2Done); 

                return coupleDocument; 
            }
        } 
        else {  // If not, alert 
        console.log("This user doesn't have a valid coupleCode entry in backend!")
        }
    } catch (error) {
        console.error('Error fetching user document: ', error);
        return null; 
    }

    return null; 
}

