import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalMediator } from 'src/app/shared/other/modal-mediator';
import { Quote } from 'src/app/quote/model/quote';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';
import { QuoteManagementService } from '../../service/quote-management.service';
import { Messages } from 'src/app/shared/constants/messages';
import { NewQuote } from '../model/new-quote';
import { Hero } from 'src/app/heroes/model/hero';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.css']
})
export class NewQuoteComponent {

  @Input('heroes')heroes:Hero[];
  @Input('createMediator') createMediator: ModalMediator<Quote>;
  @Output('quoteCreated') quoteCreated: EventEmitter<ModalMediator<Quote>> = new EventEmitter<ModalMediator<Quote>>();
  alertMediator: AlertMediator;
  displayHeroes: boolean;

  constructor(private quoteManagement: QuoteManagementService) { }

  create() {
    if (!this.isValid(this.createMediator.entity)) {
      this.alertMediator = new AlertMediator(Messages.CANNOT_BE_EMPTY, true, null); return;
    }
    this.quoteManagement.createQuote(this.createMediator.entity).subscribe(data => {
      this.quoteCreated.emit(this.createMediator);
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

  isValid(quote: NewQuote): boolean {
    if (!(quote.content && quote.content.length > 0)) {
      return false;
    }
    if (!quote.heroName) {
      return false;
    }
    return true;
  }

  close() {
    this.createMediator.display = false;
    this.createMediator.isSubmitted = false;
  }

  onSubmit(alertMediator: AlertMediator) {
    this.alertMediator = alertMediator;
  }
}
