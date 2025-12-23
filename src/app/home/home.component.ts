import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FormsModule 
} from '@angular/forms';
import { DataService } from '../data.service';
import { OnInit } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';





  @Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactComponent, 
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent  implements OnInit {
    cards: any[] = [];
  searchText: string = '';

  constructor(private dataService: DataService) {}

 ngOnInit() {
  this.cards = this.dataService.getCards();
}
  deleteCard(i: number) {
    this.dataService.deleteCard(i);
  }

  toggleExpand(card: any) {
    card.expanded = !card.expanded;
  }

  filteredCards() {
    return this.cards.filter(c =>
      c.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      c.location.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }



  
  ngAfterViewInit(): void {
    gsap.to('.ball1', {
      x: 200,
      y: -80,
      repeat: -1,
      yoyo: true,
      duration: 3
    });

    gsap.to('.ball2', {
      x: -400,
      y: 80,
      repeat: -1,
      yoyo: true,
      duration: 4
    });

    gsap.to('.ball3', {
      x: 60,
      y: -80,
      repeat: -1,
      yoyo: true,
      duration: 9
    });




  }


  
}