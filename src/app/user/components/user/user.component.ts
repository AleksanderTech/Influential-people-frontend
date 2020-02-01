import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  img: File;

  constructor(private authService: AuthenticationService, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  uploadFile(event: Event) {
    console.log(event.target['files']);
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

}
