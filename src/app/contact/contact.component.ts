import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from '../models/card.model';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  @Output() cardCreated = new EventEmitter<Card>();

  cardForm: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  imagesBase64: string[] = [];

  constructor(private fb: FormBuilder) {
    this.cardForm = this.fb.group({
      title: ['', Validators.required],
  description: ['', Validators.required],
  location: ['', Validators.required],
  images: ['']
    });
  }

  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    Array.from(input.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.imagesBase64.push(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  }

 submitForm() {
  if (this.cardForm.invalid) return;

  const imageNames = this.cardForm.value.images
    .split(',')
    .map((img: string) => `assets/${img.trim()}`);

  const newCard = {
    title: this.cardForm.value.title!,
    description: this.cardForm.value.description!,
    location: this.cardForm.value.location!,
    images: imageNames
  };

  this.cardCreated.emit(newCard);
  this.cardForm.reset();
}


}
