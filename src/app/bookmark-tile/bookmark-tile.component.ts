import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';

@Component({
  selector: 'app-bookmark-tile',
  templateUrl: './bookmark-tile.component.html',
  styleUrl: './bookmark-tile.component.scss'
})
export class BookmarkTileComponent implements OnInit{
  
  @Input()
  bookmark!: Bookmark;

  tileIconSrc:string='';
  faviconerr:boolean=false;

  constructor() { } 

  ngOnInit(): void {
    
    this.tileIconSrc = this.bookmark.url.origin+'/favicon.ico';
  }
}
