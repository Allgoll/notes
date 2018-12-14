import { Expose } from 'class-transformer';

export class OutgoingNote {
  @Expose()
  public title: string = '';
  @Expose()
  public description: string = '';
}
