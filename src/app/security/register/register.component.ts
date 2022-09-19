import { Constants } from 'src/app/framework/enum/constants';
import { environment } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataServices } from 'src/app/data.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  environment = environment;
  isCorrectPassword = false;
  registerForm: FormGroup;
  constructor(private dataServices: DataServices, private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(10)]],
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')]],
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      password: [null],
      role: [null]
    })
  }

  ngOnInit(): void {
  }

  validateConfirmPassword(value: string) {
    if (value === this.registerForm.controls['password'].value) {
      this.isCorrectPassword = true;
    } else {
      this.isCorrectPassword = false;
    }

  }

  async register() {
    if (this.registerForm.controls['username'].invalid) {
      alert("¡El número de cédula debería tener al menos 10 caracteres!")
      return;
    }
    if (this.registerForm.controls['email'].invalid) {
      alert("¡Email inválido!")
      return;
    }
    if (this.registerForm.invalid) {
      alert("¡Asegúrese de que los campos estén llenos!")
      return;
    }
    this.registerForm.value.password = this.registerForm.value.username
    this.registerForm.value.role = 'user';
    const responseRegister = await this.dataServices.register(this.registerForm.value)
    console.log('responseRegister', responseRegister)
    // const responseAddUser = await this.dataServices.addUser(this.registerForm.value);
    // console.log('responseAdduser', responseAddUser);
    this.router.navigateByUrl(Constants.NAV_LOGIN);
  }

}
