import { Expose, Type } from 'class-transformer';

export class IncomingNote {
  @Expose({ name: '_id' })
  public id: string = '';

  @Expose()
  public description: string = '';

  @Expose()
  public title: string = '';

  @Type(() => Date)
  public updatedAt: Date = new Date();
}
