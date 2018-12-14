import 'reflect-metadata';
import React, { Component } from 'react';
import Head from '../components/Head';
import { NotesList } from '../components/NotesList';
import { IncomingNote } from '../stores/notes/dto/incomingNote.dto';
import { NotesStore } from '../stores/notes/notes.store';
import { container } from '../stores/provider/container';

export default class Home extends Component<{ notes: IncomingNote[] }> {
  public static async getInitialProps() {
    const notes = container.get(NotesStore);
    await notes.getNotes();
    return { notes: notes.notes };
  }

  public componentDidMount(): void {
    const note = container.get(NotesStore);
    note.fromIncomingNote(this.props.notes);
  }

  public render() {
    console.log('server rendered');
    return <div>
      <Head title="some page" />
      <NotesList />
    </div>;
  }
}
