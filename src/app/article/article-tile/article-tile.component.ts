import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../model/article';
import { ArticleService } from '../service/article.service';
import { faStar as faSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { Modal, ModalType } from 'src/app/shared/model/modal';
import { Messages } from 'src/app/shared/constants/messages';

@Component({
  selector: 'app-article-tile',
  templateUrl: './article-tile.component.html',
  styleUrls: ['./article-tile.component.css']
})
export class ArticleTileComponent {

  @Input() article: Article;
  @Input('isFavourite') isFavourite: boolean;
  modal:Modal;
  faStar = faStar;
  faSolid = faSolid;

  constructor(private articleService: ArticleService) { }

  toogleFavourite(id: number) {
    if (this.isFavourite) {
      this.deleteFavourite(id);
      return;
    }
    this.addFavourite(id);
  }

  deleteFavourite(id: number) {
    this.articleService.deleteFavourite(id).subscribe(response => {
      this.isFavourite = false;
    }, error => {
      this.modal = new Modal(ModalType.INFO, Messages.ERROR_MESSAGE, true, null);
    });
  }

  addFavourite(id: number) {
    this.articleService.addFavourite(id).subscribe(response => {
      this.isFavourite = true;
    }, error => {
      this.modal = new Modal(ModalType.INFO, Messages.ERROR_MESSAGE, true, null);
    });
  }
}
