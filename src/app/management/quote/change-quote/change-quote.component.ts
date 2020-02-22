import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ModalMediator } from 'src/app/shared/other/modal-mediator';
import { Quote } from 'src/app/quote/model/quote';
import { ChangeQuote } from '../../quote/model/change-quote';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';
import { QuoteManagementService } from '../../service/quote-management.service';
import { Messages } from 'src/app/shared/constants/messages';
import { Hero } from 'src/app/heroes/model/hero';

@Component({
  selector: 'app-change-quote',
  templateUrl: './change-quote.component.html',
  styleUrls: ['./change-quote.component.css']
})
export class ChangeQuoteComponent {

  @Input('changeMediator') changeMediator: ModalMediator<Quote>;
  @Input('heroes') heroes: Hero[];
  @Output('quoteChanged') quoteChanged: EventEmitter<ModalMediator<Quote>> = new EventEmitter<ModalMediator<Quote>>();
  isChanged: boolean;
  alertMediator: AlertMediator;
  displayHeroes: boolean;

  constructor(private quoteManagement: QuoteManagementService) { }

  change() {
    if (!this.isValid(this.changeMediator.entity)) {
      this.alertMediator = new AlertMediator(Messages.CANNOT_BE_EMPTY, true, null); return;
    }
    this.quoteManagement.changeQuote(this.changeMediator.entity.id, this.changeMediator.entity).subscribe(data => {
      this.alertMediator = new AlertMediator(Messages.ENTITY_CREATED_SUCCESSFULLY, true, null);
    }, error => {
      this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
    });
  }

  resize(textArea: HTMLBaseElement) {
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  toogleList() {
    this.displayHeroes = !this.displayHeroes;
  }

  isValid(quote: ChangeQuote): boolean {
    if (!(quote.content && quote.content.length > 0)) {
      return false;
    }
    if (!quote.heroName) {
      return false;
    }
    return true;
  }

  close() {
    this.changeMediator.display = false;
    this.changeMediator.isSubmitted = false;
  }

  onSubmit(alertMediator: AlertMediator) {
    this.alertMediator = alertMediator;
  }
}
