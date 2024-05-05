import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

interface UserDocument { 
    coupleCode: string; 
    curSection: number; 
    email: string; 
    firstName: string; 
    lastName: string; 
    password: string; 
    uid: string;
}

interface ResultsDocument {
    results: null;
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
        // console.log("user id: " + querySnapshot.docs[0].id);
        const userDocument = querySnapshot.docs[0].data() as UserDocument;
        userDocument.uid = querySnapshot.docs[0].id;
        return userDocument;
    } catch (error) {
        console.error('Error fetching user document: ', error);
        return null;
    }
}

// query = firestore().collection(`users/${currentUser}/questionnaire`).get()
//         .then(response => {
//           response.forEach(document => {
//             console.log(document.data());
            
//           });
//         });

export async function fetchPartnerData(coupleCode: string, currentUser: string): Promise<ResultsDocument | null> {

    let parterid;

    try {
        const querySnapshot = await firestore()
            .collection(`users`)
            .where('coupleCode', '==', coupleCode)
            .get();
            // .then((qsnapshot) => {
            //     qsnapshot.forEach((doc) => {
            //         console.log(doc.id);
            //         uids.push(doc.id);
            //     });
            // });      
            
        // console.log("query: ", querySnapshot.docs[1].data());
        querySnapshot.forEach((doc) => {
            // console.log(doc.id);
            if (doc.id != currentUser) {
                parterid = doc.id;
                console.log("partner id: ", parterid);
            } 
        });

        if (querySnapshot.empty) {
            console.log("No documents found for current user");
            return null;
        }

        

        // If multiple documents are found, log a warning
        // if (querySnapshot.size > 2) {
        //     console.warn("Multiple documents found for current user");
        // }

        // Extract the first document (assuming there's only one)
        // console.log("user id: " + querySnapshot.docs[0].id);
        // userDocument.uid = querySnapshot.docs[0].id;

        // console.log(querySnapshot);
        // console.log(querySnapshot.docs[1].data());
        console.log("uids: ", uids);
        const ResultsDocument = querySnapshot.docs[0].data() as ResultsDocument;
        
        return ResultsDocument;
    } catch (error) {
        console.error('Error fetching user document: ', error);
        return null;
    }
}
