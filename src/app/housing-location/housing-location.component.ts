import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';



// decorator
@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.css'
})
export class HousingLocationComponent {
  showDetails = false;

 toggleParagraph(el: HTMLElement) {
  const p = el.nextElementSibling;
  p?.classList.toggle('show');
}
  
  commonInfo = "Blobs are designed to handle large amounts of binary data efficiently in the browser's memory or filesystem, preventing the need to load the entire file into a standard JavaScript string, which can cause performance issues. ";
 @Input() housingLocation: any; 
}

