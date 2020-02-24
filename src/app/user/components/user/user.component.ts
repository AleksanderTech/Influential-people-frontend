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
import { Messages } from 'src/app/shared/constants/messages';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';

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
  alertMediator: AlertMediator;
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
    this.imageService.fileUploaded.subscribe(isUploaded => {
      if (!isUploaded) {
        this.showModal(Messages.ERROR_MESSAGE);
      }
    })
    this.getUser(this.authService.getUsername());
    this.getFavouritesHeroes();
    this.getFavouritesArticles();
    this.getFavouritesQuotes();
  }

  showModal(message: string) {
    this.alertMediator = new AlertMediator(message, true, null);
  }

  onSubmit(alertMediator: AlertMediator) {
    this.alertMediator = alertMediator;
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
      this.showModal(Messages.ERROR_MESSAGE);
    });
  }

  deleteFavouriteArticle(id: string) {
    this.articleService.deleteFavourite(+id).subscribe(response => {
      this.getFavouritesArticles();
    }, error => {
      this.showModal(Messages.ERROR_MESSAGE);
    });
  }

  deleteFavouriteQuote(id: number) {
    this.quoteService.deleteFavourite(id).subscribe(response => {
      this.getFavouritesQuotes();
    }, error => {
      this.showModal(Messages.ERROR_MESSAGE);
    });
  }

  isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
  }

  uploadFile(event: Event) {
    let file = event.target['files'][0];
    if (file.length === 0 || !this.isFileImage(file)) {
      this.showModal(Messages.INCORRECT_IMAGE_FORMAT_MESSAGE);
      return;
    }
    this.imageService.uploadImage(this.imageService.resolveUploadUrl(this.currentUser.avatarImageUrl), file);
  }

  logout() {
    this.authService.logOut();
  }

  changePassword() {
    if(this.newPassword.length<4){
      this.alertMediator = new AlertMediator(Messages.INCORRECT_PASSWORD_FORMAT_MESSAGE, true, null);
      return;
    }
    this.userService.changePassword(new UserPassword(this.newPassword)).subscribe(data => {
      if (data.status === 200) {
        this.tooglePasswordChange();
        this.alertMediator = new AlertMediator(Messages.PASSWORD_CHANGED_MESSAGE, true, null);
        this.getUser(this.authService.getUsername());
      }
    }, error => {
      this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
    });
  }

  changeEmail() {
    if (!this.newEmail.match("(.)+[@][^@]+[.][a-zA-Z0-9]+")) {
      this.alertMediator = new AlertMediator(Messages.INCORRECT_EMAIL_FORMAT_MESSAGE, true, null);
      return;
    }
      this.userService.changeEmail(new UserEmail(this.newEmail)).subscribe(data => {
        if (data.status === 200) {
          this.toogleEmailChange();
          this.alertMediator = new AlertMediator(Messages.EMAIL_CHANGED_MESSAGE, true, null);
          this.getUser(this.authService.getUsername());
        }
      }, error => {
        this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
      });
  }

  getUser(username: string) {
    this.userService.getUser(username).subscribe(user => {
      this.currentUser = user;
    });
  } 

  isAdmin():boolean{
    return this.currentUser.roles.includes('ROLE_ADMIN');
  }

  toogleEmailChange() {
    this.emailChange = !this.emailChange;
  }

  tooglePasswordChange() {
    this.passwordChange = !this.passwordChange;
  }
}
