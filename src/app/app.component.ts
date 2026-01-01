import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ],
  templateUrl: './app.component.html'
})
export class AppComponent {

  navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label : 'Contact', path: './contact'}
  ];
}
