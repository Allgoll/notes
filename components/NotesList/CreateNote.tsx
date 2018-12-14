import { observer } from 'mobx-react';
import * as React from 'react';
import { Note } from '../../stores/notes/note';
import { NotesStore } from '../../stores/notes/notes.store';
import { injectStore } from '../../stores/provider/InjectStore';

export interface ICreateNoteProps {
  children?: React.ReactNode;
  notes: NotesStore;
}

@observer
export class CreateNoteComponent extends React.Component<ICreateNoteProps> {
  private note = new Note();

  public render(): React.ReactNode {
    return (
      <div>
        <input
          type="text"
          value={this.note.title}
          onChange={({ currentTarget: { value } }) => this.note.title = value}
          placeholder="title"
        />
        &nbsp;
        <input
          type="text"
          value={this.note.description}
          onChange={({ currentTarget: { value } }) => this.note.description = value}
          placeholder="description"
        />
        &nbsp;
        <button onClick={this.handleSave}>Save</button>
      </div>
    );
  }

  private handleSave = async () => {
    await this.note.saveNote();
    this.note.clearNote();
    await this.props.notes.getNotes();
  }
}

export const CreateNote = injectStore({ notes: NotesStore })(CreateNoteComponent);
