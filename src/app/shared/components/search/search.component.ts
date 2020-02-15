import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input()  entityName: string;
  @Input()  entities: any[];
  @Input()  searchingAttribute: string;
  @Output() entitySearching: EventEmitter<string> = new EventEmitter<string>();
  @Output() entityChoosing: EventEmitter<any> = new EventEmitter<any>();
   showDropdown: boolean;
   entitySearch: FormGroup;
   searchingValue: string;
  
  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {
    this.showDropdown = false;
  }
 
  initForm(): FormGroup {
    return this.entitySearch = this.formBuilder.group({
      search: [null]
    })
  }

  emitSearchValue(event: any) {
    if (event.target.value.length < 1) {
      this.showDropdown = false;
    }
    this.entitySearching.emit(event.target.value);
  }

  emitChosenEntity(entity: any) {
    this.searchingValue = entity[this.searchingAttribute];
    this.entityChoosing.emit(entity);
  }

  getSearchValue() {
    return this.entitySearch.value.search;
  }

  closeDropdown() {
    this.showDropdown = false;
  }

  openDropdown(event: any) {
    if (event.target.value.length >= 1) {
      this.showDropdown = true;
    }
    if (this.entities.length < 1) {
      this.showDropdown = false;
    }
  }
}
