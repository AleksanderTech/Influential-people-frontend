import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/shared/other/list';
import { Quote } from '../model/quote';
import { QuoteService } from '../service/quote.service';
import { QuoteSearch } from '../model/quote-search';
import { HeroService } from 'src/app/heroes/service/hero.service';
import { Hero } from 'src/app/heroes/model/hero';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/service/user.service';
import { faStar as faSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { Modal, ModalType } from 'src/app/shared/model/modal';
import { Messages } from 'src/app/shared/constants/messages';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent extends List<Quote> implements OnInit {

  faStar = faStar;
  faSolid = faSolid;

  searchingAttribute = 'content';
  searchEntities: Quote[];
  favouriteQuotes: Quote[];
  showEntities: boolean;
  heroes: Hero[];
  quoteSearch: QuoteSearch;
  selectedFilter: string;
  selectedSort: string;
  pathVariableHero: string;
  modal:Modal;

  constructor(private quoteService: QuoteService, private userService: UserService, private heroService: HeroService, private route: ActivatedRoute) {
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
    this.getFavouritesQuotes();
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


  getFavouritesQuotes() {
    this.userService.getFavouritesQuotes().subscribe(entities => {
      this.favouriteQuotes = entities['content'];
    });
  }


  isFavourite(id: number): boolean {
    if (this.favouriteQuotes) {
      return this.favouriteQuotes.find(quote => quote.id === id) != undefined;
    }
  }

  toogleFavourite(id: number) {
    if (this.isFavourite(id)) {
      this.deleteFavourite(id);
      return;
    }
    this.addFavourite(id);
  }

  deleteFavourite(id: number) {
    this.quoteService.deleteFavourite(id).subscribe(response => {
      this.getFavouritesQuotes();
    }, error => {
      this.modal = new Modal(ModalType.INFO, Messages.ERROR_MESSAGE, true, null);
    });
  }

  addFavourite(id: number) {
    this.quoteService.addFavourite(id).subscribe(response => {
      this.getFavouritesQuotes();
    }, error => {
      this.modal = new Modal(ModalType.INFO, Messages.ERROR_MESSAGE, true, null);
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
    this.getFavouritesQuotes();
    this.getSpecificQuotes(this.selectedPage, this.pageSize, this.quoteSearch);
   
  }

  onEntityChoosing(chosenEntity: Quote) {
    this.showEntities = false;
    this.searchEntities = [chosenEntity];
    this.entities = [chosenEntity];
  }


  updatePage(page: number) {
    this.selectedPage = page;
    this.getSpecificQuotes(this.selectedPage, this.pageSize, this.quoteSearch);
  }

  extractDisplayName(value:string,type:string):string{
    if(type === 'sort'){
      if(value === 'none'){
        return type;
      }else{
        if(value === 'asc'){
          return 'alphabetical';
        }else if(value==='desc'){
          return 'reverse';
        }return value;
      }
    }else if(type ==='filter'){
      if(value === 'none'){
        return type;
      }else{
        return value;
      }
    }
  }
}
