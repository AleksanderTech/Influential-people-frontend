import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';

@Component({
  selector: 'app-category-tile',
  templateUrl: './category-tile.component.html',
  styleUrls: ['./category-tile.component.css']
})
export class CategoryTileComponent implements OnInit {

  category: Category = new Category('Scientists')
  constructor() { }

  ngOnInit() {
  }

}
