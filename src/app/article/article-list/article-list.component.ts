import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { Article } from '../model/article';
import { List } from 'src/app/shared/components/list/list';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent extends List<Article> implements OnInit {

  private searchEntities: Article[];
  private showEntities: boolean;
  private searchingArticle: string;
  private showDropdown: boolean;
  private articleSearch: FormGroup;

  constructor(private articleService: ArticleService, private formBuilder: FormBuilder) {
    super();
    this.initForm();
  }

  ngOnInit() {
    this.selectedPage = 0;
    this.getArticles(this.selectedPage, this.pageSize);
  }
  initForm(): FormGroup {
    return this.articleSearch = this.formBuilder.group({
      search: [null]
    })
  }

  getSearchValue() {

    return this.articleSearch.value.search;
  }

  selectValue(value: Article) {

    this.searchEntities = [value];
    // this.showEntities = false;
  }

  closeDropdown() {
    this.showDropdown = false;

  }

  openDropdown(event) {
    if (event.target.value.length >= 1) {
      this.showDropdown = true;
      if (event.keyCode == 8) {

        this.showDropdown = false;
      }
    }
  }
  getArticles(page: number, size: number) {
    this.articleService.getArticles(page, size).subscribe(data => {
      console.log(data);
      this.entities = data['content'];
      this.numberOfPages = data['totalPages']
    });
  }

  updatePage(page: number) {
    this.selectedPage = page;
    this.getArticles(this.selectedPage, this.pageSize);
  }
}
