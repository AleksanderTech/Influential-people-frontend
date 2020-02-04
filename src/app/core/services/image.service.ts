import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Urls } from 'src/app/shared/constants/urls';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  behaviorSubject = new BehaviorSubject<string>('');
  userImageUrl = this.behaviorSubject.asObservable();

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
  }

  change(url: string) {
    this.behaviorSubject.next(url);
  }

  resolveUploadUrl(url: string): string {
    if (url) {
      return url;
    }
    return Urls.ROOT_REST_URL + Urls.USER + '/' + this.authService.getUsername() + Urls.IMAGE;
  }

  uploadImage(url: string, image: any) {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = event => {
      const formData = new FormData();
      formData.append('image', image);
      this.httpClient.put(url, formData).subscribe(response => {
        this.change(url);
        this.authService.updateUserImageUrl(url);
      }, error => {
        alert('Error occured');
      });
    }
  }
}
