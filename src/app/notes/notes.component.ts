import { Component, OnInit } from '@angular/core';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];

  constructor(private notesservice: NoteService) {}
  ngOnInit(): void {
    this.notes = this.notesservice.getNotes();
  }
}
