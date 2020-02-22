import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalMediator } from 'src/app/shared/other/modal-mediator';
import { Category } from 'src/app/category/model/category';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';
import { HeroManagementService } from '../../service/hero-management.service';
import { Hero } from 'src/app/heroes/model/hero';
import { Messages } from 'src/app/shared/constants/messages';
import { ChangeHero } from '../model/change-hero';

@Component({
  selector: 'app-change-hero',
  templateUrl: './change-hero.component.html',
  styleUrls: ['./change-hero.component.css']
})
export class ChangeHeroComponent implements OnInit {

  @Input('changeMediator') changeMediator: ModalMediator<ChangeHero>;
  @Input('categories') categories: Category[];
  @Output('heroChanged') heroChanged: EventEmitter<ModalMediator<ChangeHero>> = new EventEmitter<ModalMediator<ChangeHero>>();

  isCreated: boolean;
  changedHero: ChangeHero;
  alertMediator: AlertMediator;
  image: File;

  displayCategories: boolean;
  categoriesMap = new Map<string, boolean>();

  constructor(private heroManagement: HeroManagementService) { }

  ngOnInit() {
    this.categoriesMap = new Map<string, boolean>(this.categories.map(cat => [cat.name, false] as [string, boolean]));
    this.changedHero = new ChangeHero(this.changeMediator.entity.name, this.changeMediator.entity.categories);
  }

  change() {
    this.changedHero.categories = this.extractList(this.categoriesMap);
    if (!this.isValid(this.changedHero)) { this.alertMediator = new AlertMediator(Messages.CANNOT_BE_EMPTY, true, null); return; }
    this.heroManagement.changeHero(this.changedHero.name, new Hero(this.changedHero.name, null, this.changedHero.categories)).subscribe(data => {
      if (this.image) {
        this.uploadWithImage(this.changedHero.name, this.image);
      }
      this.alertMediator = new AlertMediator(Messages.ENTITY_CHANGED_SUCCESSFULLY, true, null);
    }, error => {
      this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
    });
  }

  uploadWithImage(heroName: string, image: File) {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = event => {
      const formData = new FormData();
      formData.append('image', image);
      this.heroManagement.uploadImage(heroName, formData).subscribe(response => {
        this.alertMediator = new AlertMediator(Messages.ENTITY_CHANGED_SUCCESSFULLY, true, null);
        this.heroChanged.emit(this.changeMediator);
      }, error => {
        this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
      });
    }
  }

  isValid(hero: ChangeHero): boolean {
    if(!hero.categories || hero.categories.length==0){
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
    this.image = file;
  }

  close() {
    this.changeMediator.display = false;
    this.changeMediator.isSubmitted = false;
  }

  onSubmit(alertMediator: AlertMediator) {
    this.alertMediator = alertMediator;
  }

  toogleList() {
    this.displayCategories = !this.displayCategories;
  }

  extractList(map: Map<string, boolean>): any[] {
    return new Array(...map).filter((pairs) => pairs[1]).map(pairs => pairs[0]);
  }
}
