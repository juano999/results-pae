import { environment } from './../../../environments/environment';
import { Utilities } from './../../framework/util/Utilities';
import { DataServices } from './../../data.services';
import { Component, OnInit } from '@angular/core';
import Result from 'src/app/framework/models/result';
import { Router } from '@angular/router';
import { Constants } from 'src/app/framework/enum/constants';
import { getAuth, signOut } from "firebase/auth";
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  environment = environment;
  results: Result[];
  images: string[];
  role: string;
  username: string;
  fullName: string;
  constructor(private dataService: DataServices, private router: Router, private storage: Storage) {
    // this.results = [{
    //   doctor: 'd1',
    //   date: '2022-08-25',
    //   url: 'dsdsdds.pdf',
    //   username: 'user2'
    // }];
    this.role = Utilities.getRole()
    this.username = Utilities.getUsername()
    this.fullName = Utilities.getFullName()
  }

  ngOnInit(): void {
    this.dataService.getResults(this.username).subscribe(results => {
      this.results = results;

    })
    console.log('user', this.username)
    console.log('role', this.role)


  }

  goToAddUser() {
    this.router.navigateByUrl(Constants.NAV_ADD_USER);

  }
  goToUploadResult() {
    this.router.navigateByUrl(Constants.NAV_UPLOAD_RESULT);

  }

  getDownloadUrlDocs(url: string) {

  }

  getImages() {
    const imagesRef = ref(this.storage, 'resultados');
    console.log('')
    listAll(imagesRef)
      .then(async response => {
        console.log(response);
        this.images = [];
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          //this.images.push(url);
          console.log(url)
        }
      })
      .catch(error => console.log(error));
  }

}
