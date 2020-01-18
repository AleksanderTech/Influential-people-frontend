import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() private entityName: string;
  @Input() private entities: any[];
  @Input() private searchingAttribute: string;
  @Output() entitySearching: EventEmitter<string> = new EventEmitter<string>();
  @Output() entityChoosing: EventEmitter<any> = new EventEmitter<any>();
  private showDropdown: boolean;
  private entitySearch: FormGroup;

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
    this.entitySearching.emit(event.target.value);
  }

  emitChosenEntity(entity: any) {
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
      if (event.keyCode == 8) {
        this.showDropdown = false;
      }
    }
  }
}
