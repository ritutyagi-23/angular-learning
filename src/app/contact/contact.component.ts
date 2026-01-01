import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from '../models/card.model';
import { ViewChild, ElementRef } from '@angular/core';
import { PageLayoutComponent } from '../shared/page-layout/page-layout.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,PageLayoutComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
 

  cardForm: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  images: string[] = [];

  constructor(private fb: FormBuilder,
  private dataService: DataService) {
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
          this.images.push(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  }

submitForm() {
  if (this.cardForm.invalid) return;

  const newCard: Card = {
    title: this.cardForm.value.title!,
    description: this.cardForm.value.description!,
    location: this.cardForm.value.location!,
    images: ['assets/todo.png']
  };

  this.dataService.addCard(newCard); // 🔥 REAL UPDATE
  this.cardForm.reset();
  this.images = [];
}


}
