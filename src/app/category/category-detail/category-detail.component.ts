import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { HeroService } from 'src/app/heroes/service/hero.service';
import { Hero } from 'src/app/heroes/model/hero';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  category: Category;
  topHeroes: Hero[];
  faQuoteLeft = faQuoteLeft;

  descriptionAuthor: string;
  descriptionQuote: string;
  categoryImageName:string; 

  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private heroService: HeroService) { }

  ngOnInit() {
    this.categoryService.getCategory(this.route.snapshot.paramMap.get('name')).subscribe(category => {
      this.category = category;
      this.categoryImageName = this.category.name.split(' ').join('_');
      this.extractAuthorAndQuote(category.description);
      this.heroService.getTopHeroes(category.name).subscribe(top => {
        this.topHeroes = top
      });
    });
  }

  extractAuthorAndQuote(description: string): void {
    if (description.includes('author-')) {
      this.descriptionQuote = description.substring(0, description.lastIndexOf('author'));
      this.descriptionAuthor = description.substring(description.lastIndexOf('author') + 'author-'.length, description.length);
    }else{
      this.descriptionQuote = this.category.description;
    }
  }
}
