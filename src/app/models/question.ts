import {Answer} from './answer';
import {Interviewed} from './interviewed';

export class Question {
  name?:string;
  answers?:Answer[];
  type: string;
  page:number;
  mandatory?:boolean;
  interviewed:Interviewed[]
}
