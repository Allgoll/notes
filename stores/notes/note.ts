import { action, observable } from 'mobx';
import { Api } from '../api';
import { IncomingNote } from './dto/incomingNote.dto';
import { OutgoingNote } from './dto/outgoingNote.dto';

export class Note extends Api {
  @observable public id: string = '';
  @observable public title: string = '';
  @observable public description: string = '';

  @action
  public async getNote() {
    const { data } = await this.api.get(`/notes/${this.id}/`);
    this.fillSelf(this.toDTO(IncomingNote, data));
  }

  @action
  public async saveNote() {
    await this.api.post('/notes', this.toDTO(OutgoingNote));
  }

  @action
  public async deleteNote() {
    await this.api.delete(`/notes/${this.id}`);
  }

  @action public clearNote() {
    this.fillSelf(new IncomingNote());
  }
}
