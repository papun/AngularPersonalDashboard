import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookmarkService } from '../shared/bookmark.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrl: './edit-bookmark.component.scss',
})
export class EditBookmarkComponent implements OnInit {
  bookmark: Bookmark ;


  constructor(
    private bookmarkService: BookmarkService,
    private route: ActivatedRoute,
    private router:Router,
    private notificationservice:NotificationService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const bookmarkId = paramMap.get('id')!
      this.bookmark = this.bookmarkService.getBookmark(bookmarkId)!
    })
  }
  onFormSubmit(form: NgForm) {
    const {name,url} = form.value;
    this.bookmarkService.updateBookmark(this.bookmark.id, {name, url:new URL(url)});
    this.notificationservice.show('Bookmark Updated')
  }

  onDelete() {
    this.bookmarkService.deleteBookmark(this.bookmark.id);
    this.router.navigate(['../'],{relativeTo:this.route});
    this.notificationservice.show('Bookmark Deleted')
  }
}
