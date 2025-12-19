import { Component, Input } from '@angular/core';

// decorator
@Component({
  selector: 'app-housing-location',
  standalone: true,
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.css'
})
export class HousingLocationComponent {
  @Input() housingLocation: any;  // 👈 ADD THIS
}

