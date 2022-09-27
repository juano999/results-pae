import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { addDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { collectionData, Firestore } from '@angular/fire/firestore';
import { doc, getDoc, collection } from "firebase/firestore";
import { Observable } from "rxjs";
import User from "./framework/models/user";
import { FormGroup } from "@angular/forms";
import { createUserWithEmailAndPassword, getAuth, signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import Result from "./framework/models/result";
import { Utilities } from "./framework/util/Utilities";
import { Constants } from "./framework/enum/constants";
import { Router } from "@angular/router";


@Injectable()
export class DataServices {

    constructor(private httpClient: HttpClient, private store: Firestore, private router: Router) {

    }

    public async login(username: string, password: string) {
        let stateLogin = false;
        let role = ''
        let fullName = ''
        let email = ''
        const usersRef = collection(this.store, 'users')
        const q = query(usersRef, where('username', '==', username))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=> ", doc.data())
            if (username == doc.data()["username"]) {
                stateLogin = true;
                role = doc.data()['role']
                fullName = doc.data()['name'] + ' ' + doc.data()['lastname']
                email = doc.data()['email']
            } else {
                stateLogin = false;

            }
        })
        if (stateLogin) {

            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    // Signed in..
                    console.log("Inicio de Sesión Exitoso")
                    Utilities.setUsername(username)
                    Utilities.setRole(role)
                    Utilities.setFullName(fullName);
                    Utilities.setEmail(email)
                    this.router.navigateByUrl(Constants.NAV_HOME_PAGE);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("Error en Inicio de Sesión", error)
                    alert("Credenciales incorrectas")
                    // ...
                });

        } else {
            alert("Este usuario no existe")
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

    addResult(result: Result) {
        const resultRef = collection(this.store, 'docs');
        return addDoc(resultRef, result);
    }

    addUser(user: User) {
        console.log("entra")
        const usersRef = collection(this.store, 'users');
        return addDoc(usersRef, user);
    }

    register(user: User) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                // Signed in
                const userid = userCredential.user;
                console.log('user', userid)

                this.addUser(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('error', errorMessage)
                // ..
            });
    }

}