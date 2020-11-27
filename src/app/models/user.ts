import {Poll} from './poll';

export class User {
  id?: number;
  username?: string;
  email?:string;
  password?: string;
  token?: string;
  role?:string;
  registrationDate?:string;
  polls?:Poll[]
  templates?:Poll[]
}
