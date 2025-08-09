import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Stepper } from '../stepper/stepper';
import { QuoteComponent } from '../quote/quote';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Stepper, QuoteComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
}