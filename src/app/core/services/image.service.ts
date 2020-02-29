import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Raport } from 'src/app/shared/model/raport';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  userImageUrlSubject = new BehaviorSubject<Raport<string>>(new Raport('', true));
  userImageUrlObservable = this.userImageUrlSubject.asObservable();

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
  }

  changeUserImageUrl(raport: Raport<string>) {
    this.userImageUrlSubject.next(raport);
  }

  uploadImage(url: string, image: any) {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = event => {
      const formData = new FormData();
      formData.append('image', image);
      return this.httpClient.put(url, formData).subscribe(response => {
        this.changeUserImageUrl(new Raport(url, true));
      }, error => {
        this.changeUserImageUrl(new Raport(url, false));
      });
    }
  }
}
