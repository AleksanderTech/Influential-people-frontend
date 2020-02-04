import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from '../../service/user.service';
import { UserPassword } from '../../model/user-password';
import { User } from 'src/app/shared/model/user';
import { Article } from 'src/app/article/model/article';
import { Hero } from 'src/app/heroes/model/hero';
import { faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { HeroService } from 'src/app/heroes/service/hero.service';
import { ArticleService } from 'src/app/article/service/article.service';
import { QuoteService } from 'src/app/quote/service/quote.service';
import { Quote } from 'src/app/quote/model/quote';
import { UserEmail } from '../../model/user-email';
import { ImageService } from 'src/app/core/services/image.service';
import { Urls } from 'src/app/shared/constants/urls';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  img: File;
  newPassword: string;
  newEmail: string;
  currentUser: User;
  faTrash = faTrash;
  faSearch = faSearch;

  passwordChange: boolean;
  emailChange: boolean;

  favouriteHeroes: Hero[];
  favouriteArticles: Article[];
  favouriteQuotes: Quote[];
  profileDefaultUrl: string = Urls.PROFILE_DEFAULT_IMAGE_URL;

  constructor(private imageService: ImageService, private authService: AuthenticationService, private articleService: ArticleService, private quoteService: QuoteService,
    private heroService: HeroService, private userService: UserService) { }

  ngOnInit() {
    this.imageService.userImageUrl.subscribe(url => {
      if (this.currentUser) {
        this.currentUser.avatarImageUrl = '';
        setTimeout(() => {
          this.getUser(this.authService.getUsername());
        }, 200);
      }
    });
    this.getUser(this.authService.getUsername());
    this.getFavouritesHeroes();
    this.getFavouritesArticles();
    this.getFavouritesQuotes();
  }

  onError() {
    this.currentUser.avatarImageUrl = '';
  }

  getFavouritesArticles() {
    this.userService.getFavouritesArticles().subscribe(entities => {
      this.favouriteArticles = entities['content'];
    });
  }

  getFavouritesQuotes() {
    this.userService.getFavouritesQuotes().subscribe(entities => {
      this.favouriteQuotes = entities['content'];
    });
  }

  getFavouritesHeroes() {
    this.userService.getFavouritesHeroes().subscribe(entities => {
      this.favouriteHeroes = entities['content'];
    });
  }

  deleteFavouriteHero(id: string) {
    this.heroService.deleteFavourite(id).subscribe(response => {
      this.getFavouritesHeroes();
    }, error => {
      alert('Error occured')
    });
  }

  deleteFavouriteArticle(id: string) {
    this.articleService.deleteFavourite(+id).subscribe(response => {
      this.getFavouritesArticles();
    }, error => {
      alert('Error occured');
    });
  }

  deleteFavouriteQuote(id: number) {
    this.quoteService.deleteFavourite(id).subscribe(response => {
      this.getFavouritesQuotes();
    }, error => {
      alert('Error occured');
    });
  }

  uploadFile(event: Event) {
    let file = event.target['files'][0];
    if (file.length === 0 || file.type.match(/image\/*/) == null) {
      return;
    }
    this.imageService.uploadImage(this.imageService.resolveUploadUrl(this.currentUser.avatarImageUrl), file);
  }

  logout() {
    this.authService.logOut();
  }

  changePassword() {
    this.userService.changePassword(new UserPassword(this.newPassword)).subscribe(data => {
      if (data.status === 200) {
        this.tooglePasswordChange();
        alert('Password changed successfully')
        this.getUser(this.authService.getUsername());
      }
    }, error => {
      alert('Error occured')
    });
  }

  changeEmail() {
    this.userService.changeEmail(new UserEmail(this.newEmail)).subscribe(data => {
      if (data.status === 200) {
        this.toogleEmailChange();
        this.getUser(this.authService.getUsername());
      }
    }, error => {
      alert('Error occured')
    });
  }

  getUser(username: string) {
    this.userService.getUser(username).subscribe(user => {
      this.currentUser = user;
    });
  }

  toogleEmailChange() {
    this.emailChange = !this.emailChange;
  }

  tooglePasswordChange() {
    this.passwordChange = !this.passwordChange;
  }
}
