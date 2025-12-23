import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';



@Component({
  selector: 'app-contact',
  standalone: true,
 imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {

  imageBase64 = '';

  cardForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    location: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {}

onImageSelect(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    this.imageBase64 = reader.result as string;
  };
  reader.readAsDataURL(file);
}
onEnter(event: KeyboardEvent) {
  event.preventDefault();
  this.submitForm();
}


  submitForm() {
  if (this.cardForm.invalid) {
    this.cardForm.markAllAsTouched();
    return;
  }

  const cardData = {
    title: this.cardForm.value.title,
    location: this.cardForm.value.location,
    description: this.cardForm.value.description,
    image: this.imageBase64,   // ✅ image is captured
    expanded: false
  };

  this.dataService.addCard(cardData);

  // ✅ reset AFTER saving
  this.cardForm.reset();
  this.imageBase64 = '';

 
  
}
}
