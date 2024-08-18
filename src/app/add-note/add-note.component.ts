import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss',
})
export class AddNoteComponent implements OnInit {

  constructor(private noteService:NoteService,private router:Router,private notificationservice:NotificationService){}
  ngOnInit(): void {
    
  }

  onFormSubmit(form:NgForm) {

    console.log(form.value);
    if(form.invalid) return 

    const note = new Note(form.value.title, form.value.content);
    this.noteService.addNote(note);
    this.router.navigateByUrl('/notes');
    this.notificationservice.show('Note created successfully');
  }
}


