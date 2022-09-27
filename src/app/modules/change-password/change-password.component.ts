import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  resetPasswordForm: FormGroup


  constructor(private formBuilder: FormBuilder) {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: [null, [Validators.required]],
      oldPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],

    })
  }

  ngOnInit(): void {
  }

  updatePasswordAdmin() {

  }
}
