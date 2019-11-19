import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../service/quote.service';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit {

  private quotes;

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.quoteService.getQuotes().subscribe(data => {
      console.log(data);

      this.quotes = data['content'];
    });
  }
}
