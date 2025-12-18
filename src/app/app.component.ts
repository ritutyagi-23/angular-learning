import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent],
  
  styleUrl: './app.component.css',
  template:`
  <app-navbar></app-navbar>
  `
})
export class AppComponent {
  title = 'angular-learning';
}
