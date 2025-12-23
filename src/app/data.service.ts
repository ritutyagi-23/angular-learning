import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
  private cards: any[] = [];

  constructor() {
    const saved = localStorage.getItem('cards');
    if (saved) this.cards = JSON.parse(saved);
  }

getCards() {
  return this.cards; // SAME array reference
}


  addCard(card: any) {
    this.cards.push(card);
    localStorage.setItem('cards', JSON.stringify(this.cards));
  }

  deleteCard(index: number) {
    this.cards.splice(index, 1);
    localStorage.setItem('cards', JSON.stringify(this.cards));
  }
}
