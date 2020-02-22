import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/shared/other/list';
import { Messages } from 'src/app/shared/constants/messages';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';
import { DeleteMediator } from 'src/app/shared/model/delete-mediator';
import { Searchable } from 'src/app/shared/other/searchable';
import { Manageable } from 'src/app/shared/other/manageable';
import { ModalMediator } from 'src/app/shared/other/modal-mediator';
import { Quote } from 'src/app/quote/model/quote';
import { QuoteManagementService } from '../../service/quote-management.service';
import { QuoteSearch } from 'src/app/quote/model/quote-search';
import { Hero } from 'src/app/heroes/model/hero';


@Component({
  selector: 'app-quote-management',
  templateUrl: './quote-management.component.html',
  styleUrls: ['./quote-management.component.css']
})
export class QuoteManagementComponent extends List<Quote> implements OnInit, Searchable<Quote>, Manageable<Quote> {

  quoteSearch: QuoteSearch;
  searchingAttribute: string = 'content';
  heroes: Hero[];

  changeMediator: ModalMediator<Quote>;
  createMediator: ModalMediator<Quote>;
  alertMediator: AlertMediator;
  deleteMediator: DeleteMediator;

  constructor(private _quoteManage: QuoteManagementService) {
    super();
  }

  ngOnInit() {
    this.quoteSearch = new QuoteSearch(null, null, true);
    this.findEntities(this.selectedPage, this.pageSize, this.quoteSearch);
  }

  findEntities(page: number, size: number, quoteSearch: QuoteSearch): void {
    this._quoteManage.findQuotes(this.selectedPage, this.pageSize, this.quoteSearch).subscribe(data => {
      if (data['pageable']) {
        this.entities = data['content'];
        this.numberOfPages = data['totalPages'];
      } else {
        this.entities = data;
        this.numberOfPages = 1;
      }
      this._quoteManage.findHeroes().subscribe(data => {
        this.heroes = data;
      })
    });
  }

  createEntity(): void {
    this.createMediator = new ModalMediator<Quote>(true, new Quote());
  }

  deleteEntity(entity: Quote): void {
    this.deleteMediator = new DeleteMediator(Messages.ARE_YOU_SURE_MESSAGE, true, entity.id);
  }

  changeEntity(entity: Quote): void {
    this.changeMediator = new ModalMediator<Quote>(true, entity);
  }

  onEntityChange(modalMediator: ModalMediator<Quote>): void {
    this.changeMediator = modalMediator;
    this.findEntities(this.selectedPage, this.pageSize, this.quoteSearch);
  }

  onEntityCreate(modalMediator: ModalMediator<Quote>): void {
    this.createMediator = modalMediator;
    this.findEntities(this.selectedPage, this.pageSize, this.quoteSearch);
  }

  onEntitySearching(searchValue: string) {
    this.quoteSearch.content = searchValue;
    this.findEntities(this.selectedPage, this.pageSize, this.quoteSearch);
  }

  onEntityChoosing(chosenEntity: Quote) {
    this.entities = [chosenEntity];
  }

  updatePage(page: number) {
    this.selectedPage = page;
    this.findEntities(this.selectedPage, this.pageSize, this.quoteSearch);
  }

  onSubmit(alertMediator: AlertMediator) {
    this.alertMediator = alertMediator;
  }

  onDelete(deleteMediator: DeleteMediator) {
    this._quoteManage.deleteQuote(deleteMediator.entity).subscribe(response => {
      this.alertMediator = new AlertMediator(Messages.ENTITY_DELETED_SUCCESSFULLY, true, null);
      this.findEntities(this.selectedPage, this.pageSize, this.quoteSearch);
    }, error => {
      this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
    });
  }
}
