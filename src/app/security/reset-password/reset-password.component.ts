import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Constants } from 'src/app/framework/enum/constants';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup
  environment = environment

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.resetPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      // oldPassword: [null, [Validators.required]],
      // confirmPassword: [null, [Validators.required]],

    })
  }

  ngOnInit(): void {
  }

  async resetPassword() {

    const auth = getAuth();
    const user = auth.currentUser;
    sendPasswordResetEmail(auth, this.resetPasswordForm.value.email)
      .then(() => {
        // Password reset email sent!
        // ..
        alert("¡Correo enviado exitosamente! Revisa la bandeja de tu Correo Electrónico")
        this.router.navigateByUrl(Constants.NAV_LOGIN);

      })
      .catch((error) => {
        console.log("error al enviar reset password email", error)
        // ..
        alert("No se pudo enviar el correo a esta cuenta")
      });

  }

}
