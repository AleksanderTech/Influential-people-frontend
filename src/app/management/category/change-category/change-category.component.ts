import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryManagementService } from '../../service/category-management.service';
import { Messages } from 'src/app/shared/constants/messages';
import { ChangeCategory } from '../model/change-category';
import { Category } from 'src/app/category/model/category';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';
import { ModalMediator } from 'src/app/shared/other/modal-mediator';

@Component({
  selector: 'app-change-category',
  templateUrl: './change-category.component.html',
  styleUrls: ['./change-category.component.css']
})
export class ChangeCategoryComponent implements OnInit {

  @Input('changeMediator') changeMediator: ModalMediator<Category>;
  @Output('categoryChanged') categoryChanged: EventEmitter<ModalMediator<Category>> = new EventEmitter<ModalMediator<Category>>();
  isChanged: boolean;
  changedCategory: ChangeCategory;
  alertMediator: AlertMediator;
  image: File;

  constructor(private categoryManagement: CategoryManagementService) { }

  ngOnInit() {
    this.changedCategory = this.changeMediator.entity;
  }

  change() {
      this.categoryManagement.changeCategory(this.changedCategory.name,this.changedCategory).subscribe(data => {
        this.uploadWithImage(this.changedCategory.name, this.image);
      }, error => {
        this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
      });
  }

  uploadWithImage(categoryName:string,image: File) {
      if(!image){
        this.alertMediator = new AlertMediator(Messages.ENTITY_CHANGED_SUCCESSFULLY, true, null);
        this.categoryChanged.emit(this.changeMediator);
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = event => {
        const formData = new FormData();
        formData.append('image', image);
        this.categoryManagement.uploadImage(categoryName, formData).subscribe(response => {
          this.alertMediator = new AlertMediator(Messages.ENTITY_CHANGED_SUCCESSFULLY, true, null);
          this.categoryChanged.emit(this.changeMediator);
        }, error => {
          this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
        });
      }
      return;
  }

  isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
  }

  previewImage(event: Event, image: HTMLImageElement) {
    let file = event.target['files'][0];
    if (file.length === 0 || !this.isFileImage(file)) {
      this.alertMediator = new AlertMediator(Messages.INCORRECT_IMAGE_FORMAT_MESSAGE, true, null);
      return;
    }
    image.src = URL.createObjectURL(file);
    this.image =file;
  }

  close() {
    this.changeMediator.display = false;
    this.changeMediator.isSubmitted = false;
  }

  onSubmit(alertMediator: AlertMediator) {
    this.alertMediator = alertMediator;
  }
}
