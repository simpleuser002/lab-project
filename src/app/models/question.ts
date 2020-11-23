import {Answer} from './answer';

export class Question {
  name?:string;
  answers?:Answer[];
  type: string;
  page:number;
  mandatory?:boolean;
}
