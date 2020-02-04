import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../service/quote.service';
import { ActivatedRoute } from '@angular/router';
import { Quote } from '../model/quote';
import { faStar as faSolid, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-quote-detail',
  templateUrl: './quote-detail.component.html',
  styleUrls: ['./quote-detail.component.css']
})
export class QuoteDetailComponent implements OnInit {

  faQuoteLeft = faQuoteLeft;
  faStar = faStar;
  faSolid = faSolid;

  quote: Quote;
  isFavourite: boolean;
  quoteId: number;
  quotes: Quote[];
  quoteIndex: number;

  constructor(private quoteService: QuoteService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.quoteId = +this.route.snapshot.paramMap.get('id');
    this.quoteService.getQuote(this.quoteId + "").subscribe(data => {
      this.quote = data;
      this.getFavourite(data.id);
      this.getQuotes();
    });
  }

  next(): boolean {
    let currentIndex = this.quotes.findIndex(quote => quote.id === this.quoteId);
    if (this.isNext(currentIndex)) {
      this.quote = this.quotes[currentIndex + 1];
      this.quoteId = this.quote.id;
      this.getFavourite(this.quoteId);
      return true;
    }
    return false;
  }

  isNext(currentIndex: number): boolean {
    return this.quotes.length > currentIndex + 1;
  }

  isPrevious(currentIndex: number): boolean {
    return 0 < currentIndex;
  }

  previous(): boolean {
    let currentIndex = this.quotes.findIndex(quote => quote.id === this.quoteId);
    if (this.isPrevious(currentIndex)) {
      this.quote = this.quotes[currentIndex - 1];
      this.quoteId = this.quote.id;
      this.getFavourite(this.quoteId);
      return true;
    }
    return false;
  }

  getQuotes() {
    this.quoteService.getQuotes().subscribe(data => {
      this.quotes = data;
    }, error => {
      alert('Error occured');
    });
  }

  toogleFavourite(id: number) {
    if (this.isFavourite) {
      this.deleteFavourite(id);
      return;
    }
    this.addFavourite(id);
  }

  deleteFavourite(id: number) {
    this.quoteService.deleteFavourite(id).subscribe(response => {
      this.isFavourite = false;
    }, error => {
      alert('Error occured');
    });
  }

  addFavourite(id: number) {
    this.quoteService.addFavourite(id).subscribe(response => {
      this.isFavourite = true;
    }, error => {
      alert('Error occured');
    });
  }

  getFavourite(id: number) {
    this.quoteService.getFavourite(id).subscribe(response => {
      if(response){
        this.isFavourite = true;
      }else{
        this.isFavourite = false;
      }
    }, (error => {
      this.isFavourite=false;
    }));
  }
}
