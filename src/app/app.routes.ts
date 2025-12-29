import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { Component } from '@angular/core';



export const routes: Routes = [
     { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
];
