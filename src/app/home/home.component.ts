import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Card } from '../models/card.model';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '../contact/contact.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';



@Component({
   selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,ContactComponent], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cards: Card[] = [];
 searchControl = new FormControl('');


  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.cards$.subscribe(cards => {
  this.cards = cards;
    });
     this.searchControl.valueChanges.subscribe(() => {
    this.currentPage = 1;
  });
  }
  

onCardCreated(card: any) {
  console.log('RECEIVED IN HOME:', card); // 👈 DEBUG
  this.dataService.addCard(card).subscribe();
}

deleteCard(id: number) {
  this.dataService.deleteCard(id).subscribe();
}


currentPage = 1;
itemsPerPage = 3; 
searchText = '';

get filteredCards() {
  const search = this.searchControl.value?.toLowerCase() || '';

  if (!search) {
    return this.cards;
  }

  return this.cards.filter(card =>
    card.title.toLowerCase().includes(search) ||
    card.description.toLowerCase().includes(search) ||
    card.location.toLowerCase().includes(search)
  );
}


get paginatedCards() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  return this.filteredCards.slice(startIndex, startIndex + this.itemsPerPage);
}

get totalPages() {
  return Math.ceil(this.filteredCards.length / this.itemsPerPage);
}


goToPage(page: number) {
  if (page < 1 || page > this.totalPages) return;
  this.currentPage = page;
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}
onSearchChange() {
  this.currentPage = 1;
}

}
