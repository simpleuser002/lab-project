import {Question} from './question';
import {Parameter} from './parameter';

export class Poll {
  pollname?:string;
  questions?:Question[];
  parameters: Parameter[];
  reference?:string;
  pages?:number;
}
