import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Card } from './models/card.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private apiUrl = 'http://localhost:4000/cards';

  private cardsSubject = new BehaviorSubject<Card[]>([]);
  cards$ = this.cardsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCards();
  }

// loadCards() {
//   this.http.get<any[]>(this.apiUrl).subscribe({
//     next: cards => {
//     this.cardsSubject.next(cards);
//     }
//   });
// }

loadCards() {
    this.http.get<Card[]>(this.apiUrl).subscribe(cards => {
      this.cardsSubject.next(cards);
    });
  }


// addCard(card: any) {
//  return this.http.post<any>(this.apiUrl, card).pipe(
//     tap(saved => {
//     this.cardsSubject.next([...this.cardsSubject.value, saved]);
//     })
//   );
// }

addCard(card: Card) {
    this.http.post<Card>(this.apiUrl, card).subscribe(newCard => {
      const current = this.cardsSubject.value;
      this.cardsSubject.next([...current, newCard]);
    });
  }


deleteCard(id: number) {
  this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
    const updatedCards = this.cardsSubject.value.filter(
      card => card.id !== id
    );
    this.cardsSubject.next(updatedCards);
  });
}


}
