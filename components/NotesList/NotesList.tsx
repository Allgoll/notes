import * as React from 'react';
import * as styles from './notesList.css';

import { NoteComponent } from './Note';
import { observer } from 'mobx-react';
import { NotesStore } from '../../stores/notes/notes.store';
import { injectStore } from '../../stores/provider/InjectStore';
import { CreateNote } from './CreateNote';

export interface IUnnamedProps {
  children?: React.ReactNode;
  notes: NotesStore;
}

@observer
class UnnamedComponent extends React.Component<IUnnamedProps> {
  public render(): React.ReactNode {
    const { notes } = this.props;
    return (
      <div className={styles.style}>
        <button onClick={() => notes.getNotes()}>Get Notes</button>
        {notes.notes.map((note) => <NoteComponent key={note.id} note={note} />)}
        <CreateNote />
      </div>
    );
  }
}

export const NotesList = injectStore({ notes: NotesStore })(UnnamedComponent);
