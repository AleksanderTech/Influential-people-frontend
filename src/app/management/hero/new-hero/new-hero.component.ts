import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HeroManagementService } from '../../service/hero-management.service';
import { Messages } from 'src/app/shared/constants/messages';
import { Hero } from 'src/app/heroes/model/hero';
import { ModalMediator } from 'src/app/shared/other/modal-mediator';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';
import { NewHero } from '../model/new-hero';
import { Category } from 'src/app/category/model/category';

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.css']
})
export class NewHeroComponent implements OnInit {

  @Input('createMediator') createMediator: ModalMediator<NewHero>;
  @Input('categories') categories: Category[];
  @Output('heroCreated') heroCreated: EventEmitter<ModalMediator<NewHero>> = new EventEmitter<ModalMediator<NewHero>>();

  newHero: NewHero;
  alertMediator: AlertMediator;
  image: File;

  displayCategories: boolean;
  categoriesMap = new Map<string, boolean>();

  constructor(private heroManagement: HeroManagementService) { }

  ngOnInit() {
    this.categoriesMap = new Map<string, boolean>(this.categories.map(cat => [cat.name, false] as [string, boolean]));
    this.newHero = new NewHero(null, null);
  }

  create() {
    this.newHero.categories = this.extractList(this.categoriesMap);
    if (!this.isValid(this.newHero)) { this.alertMediator = new AlertMediator(Messages.CANNOT_BE_EMPTY, true, null); return; }
    this.heroManagement.createHero(new Hero(this.newHero.name, null, this.newHero.categories)).subscribe(data => {
      if (this.image) {
        this.uploadWithImage(this.newHero.name, this.image);
      }
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
        this.alertMediator = new AlertMediator(Messages.ENTITY_CREATED_SUCCESSFULLY, true, null);
        this.heroCreated.emit(this.createMediator);
      }, error => {
        this.alertMediator = new AlertMediator(Messages.ERROR_MESSAGE, true, null);
      });
    }
  }

  isValid(hero: NewHero): boolean {
    for (let key in hero) {
      if (!hero[key]) {
        return false;
      }
    }
    if (hero.categories.length == 0) {
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
    this.createMediator.display = false;
    this.createMediator.isSubmitted = false;
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
