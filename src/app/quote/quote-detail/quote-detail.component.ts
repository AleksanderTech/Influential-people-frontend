import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../service/quote.service';
import { ActivatedRoute } from '@angular/router';
import { Quote } from '../model/quote';
import { faStar as faSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-quote-detail',
  templateUrl: './quote-detail.component.html',
  styleUrls: ['./quote-detail.component.css']
})
export class QuoteDetailComponent implements OnInit {

  faStar = faStar;
  faSolid = faSolid;

  quote:Quote;
  isFavourite:boolean;
  
  constructor(private quoteService: QuoteService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.quoteService.getQuote(this.route.snapshot.paramMap.get('id')).subscribe(data => {
      this.quote = data;
      this.getFavourite(data.id);
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
    this.quoteService.getFavourite(id).subscribe(data => {
      this.isFavourite = true;
    }, (error => {
    }));
  }
}
