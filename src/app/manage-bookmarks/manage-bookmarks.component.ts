import { Component, OnInit, ViewChild } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';

@Component({
  selector: 'app-manage-bookmarks',
  templateUrl: './manage-bookmarks.component.html',
  styleUrl: './manage-bookmarks.component.scss'
})
export class ManageBookmarksComponent implements OnInit {


  bookmarks: Bookmark[] = [];
  constructor(private bookmarkservice:BookmarkService) { }
  ngOnInit(): void {
    this.bookmarks = this.bookmarkservice.getBookmarks();
  }

  

}
