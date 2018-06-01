import { Card } from './card';
import { FileP } from './file-p';
import { User } from './user';
import { Message } from './message';
import { Notify } from './notify';

export class RequestData {
  e: number;
  d: string;
  user?: User;
  cards?: Card[];
  contact?: Card;
  messages?: Message[];
  data?: any[] | any;
  lastID?: number;
  more?: number;
  token?: string;
}
