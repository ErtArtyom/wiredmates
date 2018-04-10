import { Card } from './card';
import { User } from './user';
import { Message } from './message';
import { Notify } from './notify';

export class RequestData {
  e: number;
  d: string;
  cards?: Card[];
  user?: User;
  messages?: Message[];
  notifications?: Notify[];
  lastID?: number;
  token?: string;
}
