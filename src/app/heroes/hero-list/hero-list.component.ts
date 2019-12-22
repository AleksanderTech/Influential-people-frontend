import { Component, OnInit } from '@angular/core';
import { HeroService } from '../service/hero.service';
import { Hero } from '../model/hero';
import { List } from 'src/app/shared/components/list/list';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent extends List<Hero> implements OnInit {

  private searchEntities: Hero[];
  private showEntities: boolean;
  private searchingHero: string;
  private showDropdown: boolean;
  private heroSearch: FormGroup;

  constructor(private heroService: HeroService, private formBuilder: FormBuilder) {
    super();
    this.initForm();
  }

  ngOnInit() {
    this.selectedPage = 0;
    this.showEntities = true;
    this.getHeroes(this.selectedPage, this.pageSize);
  }

  initForm(): FormGroup {
    return this.heroSearch = this.formBuilder.group({
      search: [null]
    })
  }
  getSearchValue() {

    return this.heroSearch.value.search;
  }

  selectValue(value: Hero) {

    this.searchEntities = [value];
    this.showEntities = false;
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
  goDownList() {
    console.log('down');

  }
  goUpList() {
    console.log('up');
  }
  updatePage(page: number) {
    this.selectedPage = page;
    this.getHeroes(this.selectedPage, this.pageSize);
  }

  searchHero(name: string) {
    this.getHero(name);
  }

  getHeroes(page: number, size: number) {
    this.heroService.getHeroes(page, size).subscribe(data => {
      this.entities = data['content'];
      this.numberOfPages = data['totalPages'];
    });
  }

  getHero(name: string) {
    this.heroService.getHero(name).subscribe(data => {
      this.entities = [data];
      this.numberOfPages = 0;
    });
  }

}
