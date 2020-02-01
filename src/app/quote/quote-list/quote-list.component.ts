import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/shared/components/list/list';
import { Quote } from '../model/quote';
import { QuoteService } from '../service/quote.service';
import { QuoteSearch } from '../model/quote-search';
import { HeroService } from 'src/app/heroes/service/hero.service';
import { Hero } from 'src/app/heroes/model/hero';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent extends List<Quote> implements OnInit {

  private searchingAttribute = 'content';
  private searchEntities: Quote[];
  private showEntities: boolean;
  private heroes: Hero[];

  private quoteSearch: QuoteSearch;
  private selectedFilter: string;
  private selectedSort: string;

  private pathVariableHero: string;

  constructor(private quoteService: QuoteService, private heroService: HeroService,private route:ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.selectedPage = 0;
    this.showEntities = true;
    this.quoteSearch = new QuoteSearch();
    this.quoteSearch.paging = true;
    this.selectedSort = 'none';
    this.selectedFilter = 'none';
    this.pathVariableHero = this.route.snapshot.paramMap.get('heroName');
    if (this.pathVariableHero) {
      this.quoteSearch.heroes = [this.pathVariableHero];
      this.selectedFilter = this.pathVariableHero;
    }
    this.getSpecificQuotes(this.selectedPage, this.pageSize, this.quoteSearch);
    this.getHeroes();
  }

  sort(sortType: string) {
    this.selectedSort = sortType;
    if (sortType === this.quoteSearch.SORT_ALPH_ASC) {
      this.quoteSearch.sort = sortType;
      this.getSpecificQuotes(this.selectedPage, this.pageSize, this.quoteSearch);
    } else if (sortType === this.quoteSearch.SORT_ALPH_DESC) {
      this.quoteSearch.sort = sortType;
      this.getSpecificQuotes(this.selectedPage, this.pageSize, this.quoteSearch);
    } else {
      this.quoteSearch.resetSort();
      this.getSpecificQuotes(this.selectedPage, this.pageSize, this.quoteSearch);
    }
  }

  filter(heroName: string) {
    this.selectedFilter = heroName;
    this.quoteSearch.heroes = [heroName];
    this.getSpecificQuotes(this.selectedPage, this.pageSize, this.quoteSearch);
  }

  getSpecificQuotes(page: number, size: number, quoteSearch: QuoteSearch) {
    this.quoteService.getSpecificQuotes(page, size, quoteSearch).subscribe(data => {
      if (data['pageable']) {
        this.entities = data['content'];
        this.numberOfPages = data['totalPages'];
      } else {
        this.entities = data;
        this.numberOfPages = 1;
      }
      this.showEntities = true;
    });
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe(data => {
      this.heroes = data;
    });
  }

  getQuotes() {
    this.quoteService.getQuotes().subscribe(data => {
      this.entities = data['content'];
      this.numberOfPages = data['totalPages']
    });
  }

  onEntitySearching(searchValue: string) {
    this.quoteSearch.content = searchValue;
    this.getSpecificQuotes(this.selectedPage, this.pageSize, this.quoteSearch);
  }

  onEntityChoosing(chosenEntity:Quote) {
    this.showEntities = false;
    this.searchEntities = [chosenEntity];
    this.entities = [chosenEntity];
  }


  updatePage(page: number) {
    this.selectedPage = page;
    this.getSpecificQuotes(this.selectedPage, this.pageSize, this.quoteSearch);
  }
}
