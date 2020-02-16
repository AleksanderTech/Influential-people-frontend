import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/article/model/article';
import { List } from 'src/app/shared/other/list';
import { ArticleSearch } from 'src/app/article/model/article-search';
import { Modal, ModalType } from 'src/app/shared/model/modal';
import { ArticleManagementService } from '../../service/article-management.service';
import { Messages } from 'src/app/shared/constants/messages';

@Component({
  selector: 'app-article-management',
  templateUrl: './article-management.component.html',
  styleUrls: ['./article-management.component.css']
})
export class ArticleManagementComponent extends List<Article> implements OnInit {

  articleSearch: ArticleSearch;
  searchingAttribute: string = 'title';
  modal:Modal;

  constructor(private _articleManage: ArticleManagementService) {
    super();
  }

  ngOnInit() {
    this.articleSearch = new ArticleSearch();
    this.getSpecificArticles(this.selectedPage, this.pageSize, this.articleSearch);
  }

  getSpecificArticles(page: number, size: number, articleSearch: ArticleSearch) {
    this._articleManage.getSpecificArticles(page, size, articleSearch).subscribe(data => {
      if (data['pageable']) {
        this.entities = data['content'];
        this.numberOfPages = data['totalPages'];
      } else {
        this.entities = data;
        this.numberOfPages = 1;
      }
    });
  }

  newArticle(){
    this.modal = new Modal(ModalType.INFO,'new article',true,null);
  }

  deleteArticle(article:Article){
    this.modal = new Modal(ModalType.WARN,Messages.ARE_YOU_SURE_MESSAGE,true,null);
  }

  editArticle(article:Article){
    this.modal = new Modal(ModalType.INFO,'edit article',true,null);
  }

  onModalSubmitting(modal:Modal){
    console.log('Modal submitted');
    this.modal=modal;
  }

  onEntitySearching(searchValue: string) {
    this.articleSearch.title = searchValue;
    this.getSpecificArticles(this.selectedPage, this.pageSize, this.articleSearch);
  }

  onEntityChoosing(chosenEntity: Article) {
    
    this.entities = [chosenEntity];
  }

  updatePage(page: number) {
    this.selectedPage = page;
    this.getSpecificArticles(this.selectedPage, this.pageSize, this.articleSearch);
  }
}
