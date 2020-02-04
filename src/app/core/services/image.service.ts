import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Urls } from 'src/app/shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  behaviorSubject = new BehaviorSubject<string>('');
  userImageUrl = this.behaviorSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  change(url: string) {
    this.behaviorSubject.next(url);
  }

  resolveUploadUrl(url: string): string {
    let result;
    if (url) {
      let prefix = url.substring(0, url.indexOf('user/') + 4);
      let suffix = url.substring(url.lastIndexOf('/image'));
      result = prefix + suffix;
    } else {
      result = Urls.ROOT_REST_URL + Urls.USER + Urls.IMAGE;
    }
    return result;
  }

  uploadImage(url: string, image: any) {
    console.log(url);

    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = event => {
      const formData = new FormData();
      formData.append('image', image);
      this.httpClient.put(url, formData).subscribe(response => {
        this.change(url);
      }, error => {
        alert('Error occured');
      });
    }
  }
}
