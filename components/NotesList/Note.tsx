import { observer } from 'mobx-react';
import * as React from 'react';
import { Note } from '../../stores/notes/note';
import { NotesStore } from '../../stores/notes/notes.store';
import { injectStore } from '../../stores/provider/InjectStore';

export interface INoteProps {
  children?: React.ReactNode;
  note: Note;
  notes: NotesStore;
}

function NoteComponent2({ note, notes }: INoteProps) {
  return (
    <div>
      {note.title}&nbsp;
      {note.description}&nbsp;
      <button onClick={() => note.getNote()}>refresh</button>
      <button onClick={() => notes.removeNote(note.id)}>delete</button>
    </div>
  );
}

export const NoteComponent = injectStore({ notes: NotesStore })(observer(NoteComponent2));
