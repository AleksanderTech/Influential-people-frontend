import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../model/category';

@Component({
  selector: 'app-category-tile',
  templateUrl: './category-tile.component.html',
  styleUrls: ['./category-tile.component.css']
})
export class CategoryTileComponent implements OnInit {

  @Input() category: Category;
  constructor() { }

  ngOnInit() {



  }

}
