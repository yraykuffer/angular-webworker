import { Component } from '@angular/core';
import { PrimeCalculator } from './app.prime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Web worker sample';
   prime10 : number = 0;
   prime10000 : number = 0;

   find10thPrimeNumber() {
      this.prime10 = PrimeCalculator.findNthPrimeNumber(10);
   }

   worker = new Worker(new URL('./app.worker', import.meta.url));

   find10000thPrimeNumber() {
    this.prime10000 = 0;
      if (typeof Worker !== 'undefined') {
         // Create a new

         this.worker.onmessage = ({ data }) => {
         this.prime10000 = data;
         };
         this.worker.postMessage(10000);
      } else {
         // Web Workers are not supported in this environment.
         // You should add a fallback so that your program still executes correctly.
      }
   }

   async find10000thPrimeNumberAsync() {
    this.prime10000 = await PrimeCalculator.findNthPrimeNumberAsync(10000);

   }
}

