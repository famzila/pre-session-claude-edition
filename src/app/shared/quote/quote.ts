import { Component, inject, computed } from '@angular/core';
import { QuoteService, Quote } from '../services/quote.service';

@Component({
  selector: 'app-quote',
  imports: [],
  templateUrl: './quote.html',
  styleUrl: './quote.scss'
})
export class QuoteComponent {
  private quoteService = inject(QuoteService);
  
  quoteResource = this.quoteService.getRandomQuote();
  
  quote = computed(() => {
    return this.quoteResource.value() || null;
  });
  
  isLoading = computed(() => this.quoteResource.isLoading());
  hasError = computed(() => !!this.quoteResource.error());
  
  refreshQuote() {
    this.quoteResource.reload();
  }
}