import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark.model';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  bookmarks: Bookmark[] = [];

  storageListenSub:Subscription;
  
  constructor() {
    this.loadState();

    this.storageListenSub = fromEvent<StorageEvent>(window, 'storage').subscribe(
      (event: StorageEvent) => {
        if(event.key =='bookmarks') this.loadState();
      }
    );
   }

  getBookmarks(){
    return this.bookmarks;
  }

  getBookmark(id:string){
    return this.bookmarks.find(b=>b.id===id);
  }

  addBookmark(bookmark:Bookmark){
    this.bookmarks.push(bookmark);
    this.saveState();
  }

  updateBookmark(id:string,updatedFields:Partial<Bookmark>){
    const bookmark = this.getBookmark(id)!;
    Object.assign(bookmark,updatedFields);
    this.saveState();
  }

  deleteBookmark(id:string){
    const index = this.bookmarks.findIndex(b=>b.id===id);
    if(index ==-1 ) return;
    this.bookmarks.splice(index,1);
    this.saveState();
  }

  saveState() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  loadState() {
    try {
      const bookmarksInStorage = JSON.parse(localStorage.getItem('bookmarks')!,(key,value)=>{
        if(key == 'url') return new URL(value);
        return value;   
    });
      // if (!bookmarksInStorage) return;
      this.bookmarks.length = 0;
      this.bookmarks.push(...bookmarksInStorage);
    } catch (error) {
      console.log('There was an error loading the bookmarks from localstorage');
      console.log(error);
    }
  }
}
