import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalMediator } from 'src/app/shared/other/modal-mediator';
import { Hero } from 'src/app/heroes/model/hero';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';
import { ArticleManagementService } from '../../service/article-management.service';
import { Messages } from 'src/app/shared/constants/messages';
import { ChangeArticle } from '../../article/model/change-article';
import { Article } from 'src/app/article/model/article';

@Component({
  selector: 'app-change-article',
  templateUrl: './change-article.component.html',
  styleUrls: ['./change-article.component.css']
})
export class ChangeArticleComponent {

  @Input('changeMediator') changeMediator: ModalMediator<Article>;
  @Input('heroes') heroes: Hero[];
  @Output('articleChanged') articleChanged: EventEmitter<ModalMediator<Article>> = new EventEmitter<ModalMediator<Article>>();
  isChanged: boolean;
  alertMediator: AlertMediator;
  displayHeroes: boolean;

  constructor(private articleManagement: ArticleManagementService) { }

  change() {
    if (!this.isValid(this.changeMediator.entity)) {
      this.alertMediator = new AlertMediator(Messages.CANNOT_BE_EMPTY, true, null); return;
    }
    this.articleManagement.changeArticle(this.changeMediator.entity.id, this.changeMediator.entity).subscribe(data => {
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

  isValid(article: ChangeArticle): boolean {
    if (!(article.title && article.title.length > 0)) {
      return false;
    }
    if (!article.heroName) {
      return false;
    }
    if(!(article.text && article.text.length > 0)){
      return false;
    }
    return true;
  }

  close() {
    this.changeMediator.display = false;
    this.changeMediator.isSubmitted = false;
    this.displayHeroes = false;
  }

  onSubmit(alertMediator: AlertMediator) {
    this.alertMediator = alertMediator;
  }
}
