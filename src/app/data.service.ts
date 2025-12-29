import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Card } from './models/card.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private apiUrl = 'http://localhost:3000/cards';

  private cardsSubject = new BehaviorSubject<Card[]>([]);
  cards$ = this.cardsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCards();
  }

loadCards() {
  this.http.get<any[]>(this.apiUrl).subscribe({
    next: cards => {
    this.cardsSubject.next(cards);
    }
  });
}

addCard(card: any) {
 return this.http.post<any>(this.apiUrl, card).pipe(
    tap(saved => {
    this.cardsSubject.next([...this.cardsSubject.value, saved]);
    })
  );
}
deleteCard(id: number) {
  return this.http.delete(`http://localhost:3000/cards/${id}`).pipe(
    tap(() => {
      const updated = this.cardsSubject.value.filter(card => card.id !== id);
      this.cardsSubject.next(updated);
    })
  );
}


}
