import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../model/category';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  category: Category;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap);

    this.categoryService.getCategory(this.route.snapshot.paramMap.get('name')).subscribe(data => {

      this.category = data;
      console.log(this.category);
    });
  }
}
