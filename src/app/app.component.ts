import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, HomeComponent],
  
  styleUrl: './app.component.css',
  template:`
  <app-navbar></app-navbar>
  <app-home></app-home>
  `
})
export class AppComponent {
  title = 'angular-learning';
}
