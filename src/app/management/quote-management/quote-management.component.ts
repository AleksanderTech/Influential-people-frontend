import { Component, OnInit } from '@angular/core';
import { QuoteSearch } from 'src/app/quote/model/quote-search';
import { Quote } from 'src/app/quote/model/quote';
import { List } from 'src/app/shared/other/list';
import { QuoteManagementService } from '../service/quote-management.service';
import { Modal, ModalType } from 'src/app/shared/model/modal';
import { Messages } from 'src/app/shared/constants/messages';


@Component({
  selector: 'app-quote-management',
  templateUrl: './quote-management.component.html',
  styleUrls: ['./quote-management.component.css']
})
export class QuoteManagementComponent extends List<Quote> implements OnInit {

  quoteSearch: QuoteSearch;
  searchingAttribute: string = 'content';
  modal:Modal;

  constructor(private _quoteManage: QuoteManagementService) {
    super();
  }

  ngOnInit() {
    this.quoteSearch = new QuoteSearch();
    this.getSpecificQuotes(this.selectedPage, this.pageSize, this.quoteSearch);
  }

  getSpecificQuotes(page: number, size: number, quoteSearch: QuoteSearch) {
    this._quoteManage.getSpecificQuotes(page, size, quoteSearch).subscribe(data => {
      if (data['pageable']) {
        this.entities = data['content'];
        this.numberOfPages = data['totalPages'];
      } else {
        this.entities = data;
        this.numberOfPages = 1;
      }
    });
  }

  newQuote(){
    this.modal = new Modal(ModalType.INFO,'new quote',true,null);
  }

  deleteQuote(quote:Quote){
    this.modal = new Modal(ModalType.WARN,Messages.ARE_YOU_SURE_MESSAGE,true,null);
  }

  editQuote(quote:Quote){
    this.modal = new Modal(ModalType.INFO,'edit quote',true,null);
  }

  onModalSubmitting(modal:Modal){
    console.log('Modal submitted');
    this.modal=modal;
  }

  onEntitySearching(searchValue: string) {
    this.quoteSearch.content = searchValue;
    this.getSpecificQuotes(this.selectedPage, this.pageSize, this.quoteSearch);
  }

  onEntityChoosing(chosenEntity: Quote) {
    
    this.entities = [chosenEntity];
  }

  updatePage(page: number) {
    this.selectedPage = page;
    this.getSpecificQuotes(this.selectedPage, this.pageSize, this.quoteSearch);
  }
}
