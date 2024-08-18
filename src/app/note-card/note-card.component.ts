import { Component, Input } from '@angular/core';
import { Note } from '../shared/note.model';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})
export class NoteCardComponent {

  @Input() note!:Note ;

}
