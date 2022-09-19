import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { DataServices } from 'src/app/data.services';
import { Constants } from 'src/app/framework/enum/constants';
import { Utilities } from 'src/app/framework/util/Utilities';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup
  constructor(private formBuilder: FormBuilder, private dataServices: DataServices, private router: Router) {
    this.addUserForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      role: [null, [Validators.required]],
      password: [null],
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("loggeado")
        if (Utilities.getRole() == 'user') {
          this.router.navigateByUrl(Constants.NAV_HOME_PAGE);
        }
      } else {
        console.log("No loggeado")
        this.router.navigateByUrl(Constants.NAV_LOGIN);
      }
    });
  }

  async onSubmit() {
    this.addUserForm.value.password = this.addUserForm.value.username
    if (this.addUserForm.invalid) {
      alert("¡Algunos campos no están llenos! Asegúrese de llenarlos.")
      return;
    }
    const response = await this.dataServices.addUser(this.addUserForm.value);
    console.log(response);

    this.router.navigateByUrl(Constants.NAV_HOME_PAGE);
    alert('¡Usuario creado con éxito!');
  }

}
