import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../service/user.service';
import { UserPassword } from '../../model/user-password';
import { User } from 'src/app/shared/model/user';
import { Article } from 'src/app/article/model/article';
import { Hero } from 'src/app/heroes/model/hero';
import { Quote } from '@angular/compiler';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  img: File;
  newPassword: string;
  currentUser: User;

  favouriteHeroes: Hero[];
  favouriteArticles: Article[];
  favouriteQuotes: Quote[];

  constructor(private authService: AuthenticationService, private httpClient: HttpClient, private userService: UserService) { }

  ngOnInit() {
    this.getUser(this.authService.getUsername());
    this.getFavouritesHeroes();
    this.getFavouritesArticles();
    this.getFavouritesQuotes();
  }

  getFavouritesArticles() {
    this.userService.getFavouritesArticles().subscribe(entities => {
      this.favouriteArticles = entities['content'];
      console.log(this.favouriteArticles);
      
    });
  }

  getFavouritesQuotes() {
    this.userService.getFavouritesQuotes().subscribe(entities => {
      this.favouriteQuotes = entities['content'];
      console.log(this.favouriteQuotes);
      
    });
  }

  getFavouritesHeroes() {
    this.userService.getFavouritesHeroes().subscribe(entities => {
      this.favouriteHeroes = entities['content'];
      console.log(this.favouriteHeroes);
      
    });
  }

  uploadFile(event: Event) {
    let file = event.target['files'][0];
    if (file.length === 0)
      return;
    let mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    let reader = new FileReader();
    this.img = file;
    reader.readAsDataURL(file);
    reader.onload = event => {
      const formData = new FormData();
      formData.append('image', this.img);
      this.httpClient.put('http://localhost:8080/hero/Aristotle1/image', formData).subscribe();
    }
  }

  logout() {
    this.authService.logOut();
  }

  changePassword(newPassword: any) {
    this.userService.changePassword(new UserPassword(newPassword)).subscribe(data => {
      if (data.status === 200) {
        alert('Password changed successfully')
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
}
