import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() numberOfPages: number;
  @Output() pageClicked: EventEmitter<number> = new EventEmitter<number>();
  pages: number[];

  constructor() { }

  ngOnInit() {
    this.pages = new Array(this.numberOfPages);
  }

  pageClick(pageClicked: number) {
    this.pageClicked.emit(pageClicked);
  }
}
