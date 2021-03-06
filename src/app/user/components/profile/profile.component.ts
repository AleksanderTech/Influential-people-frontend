import { Component, OnInit } from '@angular/core';
import { UserPassword } from '../../model/user-password';
import { User } from 'src/app/shared/model/user';
import { Article } from 'src/app/article/model/article';
import { Hero } from 'src/app/heroes/model/hero';
import { faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Quote } from 'src/app/quote/model/quote';
import { UserEmail } from '../../model/user-email';
import { ImageService } from 'src/app/core/services/image.service';
import { Urls } from 'src/app/shared/constants/urls';
import { Messages } from 'src/app/shared/constants/messages';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';
import { AuthService } from 'src/app/core/services/auth.service';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { Util } from 'src/app/shared/other/util';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  img: File;
  newPassword: string;
  newEmail: string;
  alertMediator: AlertMediator;
  faTrash = faTrash;
  faSearch = faSearch;

  passwordChange: boolean;
  emailChange: boolean;

  favouriteHeroes: Hero[];
  favouriteArticles: Article[];
  favouriteQuotes: Quote[];
  currentUser: User;
  readonly defaultImageUrl:string = Urls.PROFILE_DEFAULT_IMAGE_URL;

  constructor(
    private imageService: ImageService,
    private authService: AuthService,
    private currentUserService: CurrentUserService,
    private userService: UserService) { }

  ngOnInit() {
    this.subscribeOnCurrentUser();
    this.getUser(this.currentUser.username);
    this.subscribeOnImageUpload();
    this.getFavourites();
  }

  subscribeOnImageUpload() {
    this.imageService.userImageUrlObservable.subscribe(raport => {
      if (raport.isSuccessful) {
        this.currentUser.avatarImageUrl = null;
        this.refreshUserOnImageChange();
      } else {
        this.showModal(Messages.ERROR_MESSAGE);
      }
    });
  }

  subscribeOnCurrentUser() {
    this.currentUserService.currentUserObservable.subscribe(user => {
      this.currentUser = user;
    });
  }

  getFavourites() {
    this.getFavouritesHeroes();
    this.getFavouritesArticles();
    this.getFavouritesQuotes();
  }

  refreshUserOnImageChange() {
    setTimeout(() => {
      this.getUser(this.currentUser.username);
    }, 200);
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

  getUser(username: string) {
    this.userService.getUser(username).subscribe(user => {
      this.currentUser = user;
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
    this.userService.deleteFavouriteHero(id).subscribe(response => {
      this.getFavouritesHeroes();
    }, error => {
      this.showModal(Messages.ERROR_MESSAGE);
    });
  }

  deleteFavouriteArticle(id: string) {
    this.userService.deleteFavouriteArticle(+id).subscribe(response => {
      this.getFavouritesArticles();
    }, error => {
      this.showModal(Messages.ERROR_MESSAGE);
    });
  }

  deleteFavouriteQuote(id: number) {
    this.userService.deleteFavouriteQuote(id).subscribe(response => {
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
    if (!this.currentUser.avatarImageUrl) {
      this.imageService.uploadImage(Util.buildImageUrl(Urls.ROOT_REST_URL, Urls.USER, this.currentUser.username), file);
    } else {
      this.imageService.uploadImage(this.currentUser.avatarImageUrl, file);
    }
  }

  logout() {
    this.authService.logout();
  }

  changePassword() {
    if (this.newPassword.length < 4) {
      this.alertMediator = new AlertMediator(Messages.INCORRECT_PASSWORD_FORMAT_MESSAGE, true, null);
      return;
    }
    this.userService.changePassword(new UserPassword(this.newPassword)).subscribe(data => {
      if (data.status === 200) {
        this.tooglePasswordChange();
        this.alertMediator = new AlertMediator(Messages.PASSWORD_CHANGED_MESSAGE, true, null);
        this.getUser(this.currentUserService.getCurrentUser().username);
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
        this.getUser(this.currentUserService.getCurrentUser().username);
      }
    }, error => {
      this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
    });
  }

  isAdmin(): boolean {
    return this.currentUser.roles.includes('ROLE_ADMIN');
  }

  toogleEmailChange() {
    this.emailChange = !this.emailChange;
  }

  tooglePasswordChange() {
    this.passwordChange = !this.passwordChange;
  }
}
