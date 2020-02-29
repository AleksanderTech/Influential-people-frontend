import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Urls } from 'src/app/shared/constants/urls';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  userImageUrlSubject = new BehaviorSubject<string>('');
  fileUploadedSubject = new BehaviorSubject<boolean>(true);
  userImageUrl = this.userImageUrlSubject.asObservable();
  fileUploaded = this.fileUploadedSubject.asObservable();

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
  }

  changeUserImageUrl(url: string) {
    this.userImageUrlSubject.next(url);
  }

  changeFileUploaded(isUploaded: boolean) {
    this.fileUploadedSubject.next(isUploaded);
  }

  uploadImage(url: string, image: any) {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = event => {
      const formData = new FormData();
      formData.append('image', image);
      return this.httpClient.put(url, formData).subscribe(response => {
        this.changeUserImageUrl(url);
        this.changeFileUploaded(true);
      }, error => {
        this.changeFileUploaded(false);
      });
    }
  }
}
