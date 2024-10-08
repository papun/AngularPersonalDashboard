import { Injectable, OnDestroy } from '@angular/core';
import { Note } from './note.model';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService implements OnDestroy{
  notes: Note[] = [];

  storageListenSub:Subscription;

  constructor() {
    this.loadState();

    this.storageListenSub = fromEvent<StorageEvent>(window, 'storage').subscribe(
      (event: StorageEvent) => {
        if(event.key =='notes') this.loadState();
      }
    );
  }
  ngOnDestroy(): void {
    if(this.storageListenSub) this.storageListenSub.unsubscribe();
  }

  getNotes() {
    return this.notes;
  }

  getNote(id: string) {
    return this.notes.find((n) => n.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
    this.saveState();
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id)!;
    Object.assign(note, updatedFields);
    this.saveState();
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex((n) => n.id === id);
    if (noteIndex == -1) return;
    this.notes.splice(noteIndex, 1);
    this.saveState();
  }

  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadState() {
    try {
      const notesinStorage = JSON.parse(localStorage.getItem('notes')!);
      // if (!notesinStorage) return;
      this.notes.length = 0;
      this.notes.push(...notesinStorage);
    } catch (error) {
      console.log('There was an error loading the notes from localstorage');
      console.log(error);
    }
  }
}
