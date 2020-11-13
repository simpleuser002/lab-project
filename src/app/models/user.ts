import {Poll} from './poll';

export class User {
  id?: number;
  username?: string;
  password?: string;
  token?: string;
  role?:string;
  registrationDate?:string;
  polls?:Poll[]
}
