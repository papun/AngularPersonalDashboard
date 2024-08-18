import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookmarkService } from '../shared/bookmark.service';
import { Router } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrl: './add-bookmark.component.scss',
})
export class AddBookmarkComponent {

  constructor(private bookmarkservice:BookmarkService,private router:Router,private notificationservice:NotificationService) {}


  onFormSubmit(form: NgForm) {
    const name = form.value.name;
    const url = form.value.url;
    const bookmark = new Bookmark(name, url);
    this.bookmarkservice.addBookmark(bookmark);
    this.router.navigateByUrl('/bookmarks');
    this.notificationservice.show('Created Bookmark!!');
  }
}
