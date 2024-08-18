import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NoteService } from '../shared/note.service';
import { Note } from '../shared/note.model';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.scss',
})
export class EditNoteComponent implements OnInit {

  note?: Note;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router,
    private notificationservice:NotificationService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // console.log(params.get('id'));

      this.note = this.noteService.getNote(params.get('id')!);
      // console.log(this.note?.title);
      // console.log(this.note?.content);
    });
  }

  onFormSubmit(form: NgForm) {
    console.log(form.valid);
    if (form.valid) {
      console.log(form.value);
      this.noteService.updateNote(this.note!.id, form.value);
      this.router.navigateByUrl('/notes');
      this.notificationservice.show('Note Updated');
    }
  }

  onDelete() {
    console.log("delete");
    this.noteService.deleteNote(this.note!.id);
    this.notificationservice.show('Note Deleted');
    this.router.navigateByUrl('/notes');
    }
}
