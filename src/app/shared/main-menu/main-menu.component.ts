import { Utilities } from './../../framework/util/Utilities';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { getAuth, signOut } from "firebase/auth";
import { Constants } from 'src/app/framework/enum/constants';
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  environment = environment
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      this.router.navigateByUrl(Constants.NAV_LOGIN);
      Utilities.cleanStorage();
    }).catch((error) => {
      // An error happened.
    });
  }

}
