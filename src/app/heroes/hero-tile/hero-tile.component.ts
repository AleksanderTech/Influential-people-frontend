import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../model/hero';

@Component({
  selector: 'app-hero-tile',
  templateUrl: './hero-tile.component.html',
  styleUrls: ['./hero-tile.component.css']
})
export class HeroTileComponent implements OnInit {

  @Input('hero') hero: Hero;

  constructor() { }

  ngOnInit() {
  }

}
