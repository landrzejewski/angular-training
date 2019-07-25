import {environment} from "../environments/environment";

export class Api {

  books = `${environment.baseUrl}/books`;
  oauth = `${environment.securityBaseUrl}/oauth/token`;
  activeAccount = `${environment.securityBaseUrl}/api/v1/users/active`;

}
