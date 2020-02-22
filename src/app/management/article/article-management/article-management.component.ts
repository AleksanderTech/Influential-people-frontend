import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/article/model/article';
import { List } from 'src/app/shared/other/list';
import { ArticleSearch } from 'src/app/article/model/article-search';
import { ArticleManagementService } from '../../service/article-management.service';
import { Messages } from 'src/app/shared/constants/messages';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';
import { DeleteMediator } from 'src/app/shared/model/delete-mediator';
import { Searchable } from 'src/app/shared/other/searchable';
import { Manageable } from 'src/app/shared/other/manageable';
import { Hero } from 'src/app/heroes/model/hero';
import { ModalMediator } from 'src/app/shared/other/modal-mediator';

@Component({
  selector: 'app-article-management',
  templateUrl: './article-management.component.html',
  styleUrls: ['./article-management.component.css']
})
export class ArticleManagementComponent extends List<Article> implements OnInit, Searchable<Article>, Manageable<Article> {

  articleSearch: ArticleSearch;
  searchingAttribute: string = 'title';
  heroes: Hero[];

  changeMediator: ModalMediator<Article>;
  createMediator: ModalMediator<Article>;
  alertMediator: AlertMediator;
  deleteMediator: DeleteMediator;

  constructor(private _articleManage: ArticleManagementService) {
    super();
  }

  ngOnInit() {
    this.articleSearch = new ArticleSearch(null, true);
    this.findEntities(this.selectedPage, this.pageSize, this.articleSearch);
  }

  findEntities(page: number, size: number, articleSearch: ArticleSearch): void {
    this._articleManage.findArticles(this.selectedPage, this.pageSize, this.articleSearch).subscribe(data => {
      if (data['pageable']) {
        this.entities = data['content'];
        this.numberOfPages = data['totalPages'];
      } else {
        this.entities = data;
        this.numberOfPages = 1;
      }
      this._articleManage.findHeroes().subscribe(data => {
        this.heroes = data;
      })
    });
  }

  createEntity(): void {
    this.createMediator = new ModalMediator<Article>(true, new Article());
  }

  deleteEntity(entity: Article): void {
    this.deleteMediator = new DeleteMediator(Messages.ARE_YOU_SURE_MESSAGE, true, entity.id);
  }

  changeEntity(entity: Article): void {
    this.changeMediator = new ModalMediator<Article>(true, entity);
  }

  onEntityChange(modalMediator: ModalMediator<Article>): void {
    this.changeMediator = modalMediator;
    this.findEntities(this.selectedPage, this.pageSize, this.articleSearch);
  }

  onEntityCreate(modalMediator: ModalMediator<Article>): void {
    this.createMediator = modalMediator;
    this.findEntities(this.selectedPage, this.pageSize, this.articleSearch);
  }

  onEntitySearching(searchValue: string) {
    this.articleSearch.title = searchValue;
    this.findEntities(this.selectedPage, this.pageSize, this.articleSearch);
  }

  onEntityChoosing(chosenEntity: Article) {
    this.entities = [chosenEntity];
  }

  updatePage(page: number) {
    this.selectedPage = page;
    this.findEntities(this.selectedPage, this.pageSize, this.articleSearch);
  }

  onSubmit(alertMediator: AlertMediator) {
    this.alertMediator = alertMediator;
  }

  onDelete(deleteMediator: DeleteMediator) {
    this._articleManage.deleteArticle(deleteMediator.entity).subscribe(response => {
      this.alertMediator = new AlertMediator(Messages.ENTITY_DELETED_SUCCESSFULLY, true, null);
      this.findEntities(this.selectedPage, this.pageSize, this.articleSearch);
    }, error => {
      this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
    });
  }
}
