import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit,OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
  this.pages = new Array(this.numberOfPages);
  }

  @Input() numberOfPages: number;
  @Output() pageClicked: EventEmitter<number> = new EventEmitter<number>();
  currentPage: number;
  pages: number[];

  constructor() { }

  ngOnInit() {
    this.currentPage = 0;
    this.pages = new Array(this.numberOfPages);
  }

  next() {
    console.log(this.currentPage);
    this.currentPage = this.currentPage + 1;
    if (this.currentPage <= this.numberOfPages) {
      this.pageClicked.emit(this.currentPage);
    }
  }

  previous() {
    this.currentPage = this.currentPage - 1;
    if (this.currentPage >= 0) {
      this.pageClicked.emit(this.currentPage);
    }
  }

  pageClick(pageClicked: number) {
    this.currentPage = pageClicked;
    console.log(pageClicked);

    this.pageClicked.emit(pageClicked);

  }
}
