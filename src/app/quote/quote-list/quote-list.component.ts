import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/shared/components/list/list';
import { FormBuilder } from '@angular/forms';
import { Quote } from '../model/quote';
import { QuoteService } from '../service/quote.service';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent extends List<Quote> implements OnInit {

  private readonly searchingAttribute = 'content';
  private searchEntities: Quote[];
  private showEntities: boolean;
  private searchValue: string;

  constructor(private quoteService: QuoteService, private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.selectedPage = 0;
    this.showEntities = true;
    this.getQuotes(this.selectedPage, this.pageSize);
  }

  onEntitySearching(searchValue: string) {
    this.searchValue = searchValue;
    this.showEntities = true;
  }

  onEntityChoosing(chosenEntity) {
    this.showEntities = false;
    this.searchEntities = [chosenEntity];
  }

  getQuotes(page: number, size: number) {
    this.quoteService.getQuotes(page, size).subscribe(data => {
      console.log(data);
      this.entities = data['content'];
      this.numberOfPages = data['totalPages']
    });
  }

  updatePage(page: number) {
    this.selectedPage = page;
    this.getQuotes(this.selectedPage, this.pageSize);
  }
}
