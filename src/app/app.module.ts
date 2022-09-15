import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { MainMenuComponent } from './shared/main-menu/main-menu.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './security/login/login.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { DataServices } from './data.services';
import { HttpClientModule } from '@angular/common/http';
import { FirestoreModule } from '@angular/fire/firestore'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MainMenuComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [DataServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
