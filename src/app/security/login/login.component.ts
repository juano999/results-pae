import { Utilities } from './../../framework/util/Utilities';
import { DataServices } from './../../data.services';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Constants } from 'src/app/framework/enum/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  environment = environment
  loginForm: FormGroup;

  constructor(private dataServices: DataServices, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],

    })
  }

  ngOnInit(): void {
    // this.dataServices.getUsers().subscribe((users) => {
    //   console.log(users);
    // })
  }

  async login() {
    await this.dataServices.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log("Cambiar de pantalla")
        this.router.navigateByUrl(Constants.NAV_HOME_PAGE);

        // ...
      } else {
        this.loginForm.reset()

      }
    });
  }



}
