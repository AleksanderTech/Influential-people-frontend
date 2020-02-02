import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../service/article.service';
import { Article } from '../model/article';
import { CommentService } from '../service/comment.service';
import { faStar as faSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  faStar = faStar;
  faSolid = faSolid;

  isFavourite:boolean;
  article: Article;
  constructor(private commentService: CommentService, private articleService: ArticleService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.articleService.getArticle(this.route.snapshot.paramMap.get('id')).subscribe(data => {
      this.article = data;
      this.getFavourite(data.id);
    });
  }

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
      alert('Error occured');
    });
  }

  addFavourite(id: number) {
    this.articleService.addFavourite(id).subscribe(response => {
      this.isFavourite = true;
    }, error => {
      alert('Error occured');
    });
  }
  
  getFavourite(id: number) {
    this.articleService.getFavourite(id).subscribe(data => {
      this.isFavourite = true;
    }, (error => {
    }));
  }
}
