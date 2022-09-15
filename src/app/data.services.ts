import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getDocs, getFirestore, query, where } from "firebase/firestore";
import { collectionData, Firestore } from '@angular/fire/firestore';
import { doc, getDoc, collection } from "firebase/firestore";
import { Observable } from "rxjs";
import User from "./framework/models/user";
import { FormGroup } from "@angular/forms";
import { getAuth, signInAnonymously } from "firebase/auth";
import Result from "./framework/models/result";


@Injectable()
export class DataServices {

    constructor(private httpClient: HttpClient, private store: Firestore) {

    }

    public async login(username: string, password: string) {
        let stateLogin = false;
        const usersRef = collection(this.store, 'users')
        const q = query(usersRef, where('username', '==', username))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=> ", doc.data())
            if (username == doc.data()["username"] && password == doc.data()["password"]) {
                stateLogin = true;
            } else {
                stateLogin = false;
            }
        })
        if (stateLogin) {

            const auth = getAuth();
            signInAnonymously(auth)
                .then(() => {
                    // Signed in..
                    console.log("esta dentro")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ...
                });

        }
    }

    getUsers(): Observable<User[]> {
        const usersRef = collection(this.store, 'users')
        return collectionData(usersRef, { idField: 'id' }) as Observable<User[]>;
    }

    getResults(username: string): Observable<Result[]> {
        const documentsRef = collection(this.store, 'docs');
        const q = query(documentsRef, where('username', '==', username))
        return collectionData(q, { idField: 'id' }) as Observable<Result[]>;
    }

}