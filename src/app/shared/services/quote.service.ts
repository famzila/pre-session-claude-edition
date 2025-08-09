import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';

export interface Quote {
  content: string; // Quote text
  author: string;  // Author
  length: number;  // Character count
  tags: string[];  // Quote tags
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private readonly apiUrl = 'https://api.quotable.io/random';
  
  getRandomQuote() {
    return httpResource<Quote>(() => this.apiUrl);
  }
}