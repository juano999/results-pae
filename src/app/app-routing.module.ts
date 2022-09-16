import { UploadResultComponent } from './modules/upload-result/upload-result.component';
import { AddUserComponent } from './modules/add-user/add-user.component';
import { LoginComponent } from './security/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Constants } from './framework/enum/constants';
import { HomePageComponent } from './modules/home-page/home-page.component';
const routes: Routes = [
  {
    path: Constants.NAV_HOME_PAGE,
    component: HomePageComponent
  },
  {
    path: Constants.NAV_ADD_USER,
    component: AddUserComponent
  },
  {
    path: Constants.NAV_UPLOAD_RESULT,
    component: UploadResultComponent
  },
  {
    path: '\**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
