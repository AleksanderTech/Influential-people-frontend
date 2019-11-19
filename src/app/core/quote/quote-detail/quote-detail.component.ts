import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../service/quote.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quote-detail',
  templateUrl: './quote-detail.component.html',
  styleUrls: ['./quote-detail.component.css']
})
export class QuoteDetailComponent implements OnInit {

  quote;
  constructor(private quoteService: QuoteService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.quoteService.getQuote(this.route.snapshot.paramMap.get('id')).subscribe(data => {
      console.log(data);
      this.quote = data;
    });
  }
}
