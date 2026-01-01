import { Component } from '@angular/core';
import { PageLayoutComponent } from '../shared/page-layout/page-layout.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PageLayoutComponent],
  templateUrl: './about.component.html'
})
export class AboutComponent {

  aboutData = {
    description: 'We build Angular applications.',
    location: 'India',
    experience: '3+ years'
  };
}
