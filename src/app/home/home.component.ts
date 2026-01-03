import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Card } from '../models/card.model';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PageLayoutComponent } from '../shared/page-layout/page-layout.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageLayoutComponent, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cards: Card[] = [];
  searchControl = new FormControl('');

  currentPage = 1;
  itemsPerPage = 3;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // 🔥 Load cards from server
    this.dataService.loadCards();

    // 🔥 Auto update UI
    this.dataService.cards$.subscribe(cards => {
      this.cards = cards;
    });

    this.searchControl.valueChanges.subscribe(() => {
      this.currentPage = 1;
    });
  }

deleteCard(id: number) {
  this.dataService.deleteCard(id);
}


  // 🔍 Search
  get filteredCards() {
    const search = this.searchControl.value?.toLowerCase() || '';
    return this.cards.filter(card =>
      card.title.toLowerCase().includes(search) ||
      card.description.toLowerCase().includes(search) ||
      card.location.toLowerCase().includes(search)
    );
  }

  // 📄 Pagination
  get paginatedCards() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCards.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredCards.length / this.itemsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  goToPage(page: number) {
    this.currentPage = page;
  }
}
