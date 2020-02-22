import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Messages } from 'src/app/shared/constants/messages';
import { CategoryManagementService } from '../../service/category-management.service';
import { NewCategory } from '../model/new-category';
import { Category } from 'src/app/category/model/category';
import { ModalMediator } from 'src/app/shared/other/modal-mediator';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  @Input('createMediator') createMediator: ModalMediator<Category>;
  @Output('categoryCreated') categoryCreated: EventEmitter<ModalMediator<Category>> = new EventEmitter<ModalMediator<Category>>();
  isCreated: boolean;
  newCategory: NewCategory;
  alertMediator: AlertMediator;
  image: File;

  constructor(private categoryManagement: CategoryManagementService) { }

  ngOnInit() {
    this.newCategory = new NewCategory(null, null);
  }

  create() {
    if (this.isValid(this.newCategory)) {
      this.categoryManagement.createCategory(this.newCategory).subscribe(data => {
        this.uploadWithImage(this.newCategory.name, this.image);
      }, error => {
        this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
      });
      return
    } this.alertMediator = new AlertMediator(Messages.CANNOT_BE_EMPTY, true, null);
  }

  uploadWithImage(categoryName:string,image: File) {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = event => {
      const formData = new FormData();
      formData.append('image', image);
      this.categoryManagement.uploadImage(categoryName, formData).subscribe(response => {
        this.alertMediator = new AlertMediator(Messages.ENTITY_CREATED_SUCCESSFULLY, true, null);
        this.categoryCreated.emit(this.createMediator);
      }, error => {
        this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
      });
    }
  }

  isValid(category: NewCategory): boolean {
    for (let key in category) {
      if (!category[key]) {
        return false;
      }
    }
    if (!this.image) {
      return false;
    }
    return true;
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
    this.createMediator.display = false;
    this.createMediator.isSubmitted = false;
  }

  onSubmit(alertMediator: AlertMediator) {
    this.alertMediator = alertMediator;
  }
}
