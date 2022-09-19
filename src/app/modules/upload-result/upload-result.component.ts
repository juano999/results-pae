import { Utilities } from './../../framework/util/Utilities';

import { DataServices } from './../../data.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { async } from 'rxjs';
import { Router } from '@angular/router';
import { Constants } from 'src/app/framework/enum/constants';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-upload-result',
  templateUrl: './upload-result.component.html',
  styleUrls: ['./upload-result.component.scss']
})
export class UploadResultComponent implements OnInit {
  uploadResultForm: FormGroup
  file: any;
  showSpinner = false;
  constructor(private storage: Storage, private formBuilder: FormBuilder, private dataServices: DataServices, private router: Router) {
    this.uploadResultForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      doctor: [null, [Validators.required]],
      city: [null, [Validators.required]],
      url: [null],
      date: [null]
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

  uploadDoc($event: any) {
    this.file = $event.target.files[0];
    console.log(this.file);

  }

  async onSubmit() {
    this.showSpinner = true
    this.uploadResultForm.value.date = new Date();


    if (this.file == '' || this.file == null) {
      this.showSpinner = false
      alert("¡No ha seleccionado ningun archivo! Asegúrese de seleccionar uno.")
      return;
    } else {
      const imgRef = ref(this.storage, `resultados/${this.file.name}`);

      await uploadBytes(imgRef, this.file)
        .then((response) => {
          console.log(response)
          //this.getImages();

        })
        .catch(error => console.log(error));

      await getDownloadURL(ref(this.storage, `resultados/${this.file.name}`))
        .then((url) => {
          console.log('url', url)
          this.uploadResultForm.value.url = url;
        })
        .catch((error) => {
          console.log('error', error)
        });
    }

    console.log(this.uploadResultForm.controls)
    console.log(this.uploadResultForm.value.url)
    if (this.uploadResultForm.invalid) {
      this.showSpinner = false
      alert("¡Algunos campos no están llenos! Asegúrese de llenarlos.")
      return;
    }

    const response = await this.dataServices.addResult(this.uploadResultForm.value);
    console.log(response);
    this.showSpinner = false
    this.router.navigateByUrl(Constants.NAV_HOME_PAGE);
    alert('¡Resultado subido con éxito!');
  }

}
