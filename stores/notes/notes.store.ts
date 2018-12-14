import { action, observable } from 'mobx';
import { Api } from '../api';
import { makeStore } from '../provider/MakeStore';
import { IncomingNote } from './dto/incomingNote.dto';
import { Note } from './note';

@makeStore(NotesStore)
export class NotesStore extends Api {
  @observable public notes: Note[] = [];

  @action public async getNotes() {
    const { data } = await this.api.get<any[]>('/notes');
    const notes = this.toDTO(IncomingNote, data);
    this.fromIncomingNote(notes);
  }

  @action public fromIncomingNote(notes: IncomingNote[]) {
    this.notes = notes.map((note) => {
      const noteClass = new Note();
      noteClass.fillSelf(note);
      return noteClass;
    });
  }

  @action public async removeNote(noteId: string) {
    const note = this.notes.find(({ id }) => id === noteId);
    if (note) {
      await note.deleteNote();
      this.notes = this.notes.filter(({id}) => id !== noteId);
    }
  }
}
