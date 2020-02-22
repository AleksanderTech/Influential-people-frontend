import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from 'src/app/heroes/model/hero';
import { ModalMediator } from 'src/app/shared/other/modal-mediator';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';
import { ArticleManagementService } from '../../service/article-management.service';
import { Messages } from 'src/app/shared/constants/messages';
import { NewArticle } from '../../article/model/new-article';
import { Article } from 'src/app/article/model/article';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent {

  @Input('heroes') heroes: Hero[];
  @Input('createMediator') createMediator: ModalMediator<Article>;
  @Output('articleCreated') articleCreated: EventEmitter<ModalMediator<Article>> = new EventEmitter<ModalMediator<Article>>();
  alertMediator: AlertMediator;
  displayHeroes: boolean;

  constructor(private articleManagement: ArticleManagementService) { }

  create() {
    if (!this.isValid(this.createMediator.entity)) {
      this.alertMediator = new AlertMediator(Messages.CANNOT_BE_EMPTY, true, null); return;
    }
    this.articleManagement.createArticle(this.createMediator.entity).subscribe(data => {
      this.articleCreated.emit(this.createMediator);
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

  isValid(article: NewArticle): boolean {
    if (!(article.text && article.text.length > 0)) {
      return false;
    }
    if (!article.heroName) {
      return false;
    }
    if (!(article.title && article.title.length)) {
      return false;
    }
    return true;
  }

  close() {
    this.createMediator.display = false;
    this.createMediator.isSubmitted = false;
    this.displayHeroes = false;
  }

  onSubmit(alertMediator: AlertMediator) {
    this.alertMediator = alertMediator;
  }
}
