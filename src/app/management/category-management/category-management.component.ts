import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/category/model/category';
import { List } from 'src/app/shared/other/list';
import { Modal, ModalType } from 'src/app/shared/model/modal';
import { CategoryManagementService } from '../service/category-management.service';
import { Messages } from 'src/app/shared/constants/messages';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent extends List<Category> implements OnInit {

  categorySearch: string;
  searchingAttribute: string = 'name';
  modal: Modal;

  constructor(private _categoryManage: CategoryManagementService) {
    super();
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this._categoryManage.getCategories().subscribe(data => {
      this.entities = data;
      this.numberOfPages = 1;
    });
  }

  newCategory() {
    this.modal = new Modal(ModalType.INFO, 'new category', true, null);
  }

  deleteCategory(category: Category) {
    this.modal = new Modal(ModalType.WARN, Messages.ARE_YOU_SURE_MESSAGE, true, null);
  }

  editCategory(category: Category) {
    this.modal = new Modal(ModalType.INFO, 'edit category', true, null);
  }

  onModalSubmitting(modal: Modal) {
    console.log('Modal submitted');
    this.modal = modal;
  }

  onEntitySearching(searchValue: string) {
    if (searchValue) {
      this.entities = this.entities.filter(entity => entity.name.startsWith(searchValue));
      return;
    } this.getCategories();
  }

  onEntityChoosing(chosenEntity: Category) {

    this.entities = [chosenEntity];
  }

  updatePage(page: number) {
    this.selectedPage = page;
  }
}
