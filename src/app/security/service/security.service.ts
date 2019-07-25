import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Api} from '../../api';
import {Router} from '@angular/router';
import {CryptoService} from '../../shared/service/crypto.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthenticationModel} from '../model/authentication.model';
import {map, mergeMap, shareReplay} from 'rxjs/operators';
import uuid from 'uuid/v4';
import {AccountModel} from '../model/account.model';

@Injectable()
export class SecurityService {

  private readonly authenticationKey = 'client_id';
  private readonly saltKey = 'app_id';
  private readonly clientId = 'books';

  authenticationChanges: Observable<AuthenticationModel>;

  private authenticationSubject = new BehaviorSubject<AuthenticationModel>(new AuthenticationModel());
  private authentication = new AuthenticationModel();

  constructor(private httpClient: HttpClient, private api: Api, private router: Router, private cryptoService: CryptoService) {
    this.authenticationChanges = this.authenticationSubject.asObservable();
    this.restoreSecurityContext();
  }

  private restoreSecurityContext() {
    const authentication = this.loadAuthentication();
    const salt = this.loadSalt();
    if (authentication && salt) {
      const decryptedData = this.cryptoService.get(this.shuffleSalt(salt), authentication);
      this.authentication = JSON.parse(decryptedData);
      this.authenticationSubject.next(this.getPublicAuthentication());
    } else {
      this.createSalt();
    }
  }

  private createSalt() {
    localStorage.setItem(this.saltKey, uuid());
  }

  private loadAuthentication(): string {
    return sessionStorage.getItem(this.authenticationKey);
  }

  private loadSalt(): string {
    return localStorage.getItem(this.saltKey);
  }

  private shuffleSalt(salt: string) {
    return salt.substr(18, 36) + salt.substr(0, 18);
  }

  private getPublicAuthentication(): AuthenticationModel {
    const authentication = new AuthenticationModel();
    authentication.username = this.authentication.username;
    authentication.roles = this.authentication.roles;
    return authentication;
  }

  login(username: string, password: string): Observable<AccountModel> {
    const payload = this.preparePayload(username, password);
    const authenticationChanges = this.retrieveToken(payload).pipe(shareReplay(1));
    const accountChanges = authenticationChanges.pipe(mergeMap(this.retrieveAccount)).pipe(shareReplay(1));
    authenticationChanges.subscribe(
      (authentication) => this.authentication = authentication,
      (error) => console.log('Login failed', error));
    accountChanges.subscribe(
      (account) => this.updateSecurityContext(account),
      (error) => console.log('Account loading failed', error));
    return accountChanges;
  }

  private preparePayload(username: string, password: string): string {
    const payload = new URLSearchParams();
    payload.set('username', username);
    payload.set('password', password);
    payload.set('grant_type', 'password');
    payload.set('client_id', this.clientId);
    return payload.toString();
  }

  private retrieveToken(payload: string): Observable<AuthenticationModel> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.httpClient.post(this.api.oauth, payload, {headers})
      .pipe(map(this.toAuthentication));

  }

  private toAuthentication(json) {
    const authentication = new AuthenticationModel();
    authentication.token = json['access_token'];
    authentication.refreshToken = json['refresh_token'];
    return authentication;
  }

  private retrieveAccount(): Observable<AccountModel> {
    return this.httpClient.get<AccountModel>(this.api.activeAccount);
  }

  private updateSecurityContext(account: AccountModel) {
    const salt = this.loadSalt();
    this.authentication.username = account.login;
    this.authentication.roles = account.roles || ['user'];
    this.authenticationSubject.next(this.getPublicAuthentication());
    const encryptedData = this.cryptoService.set(this.shuffleSalt(salt), JSON.stringify(this.authentication));
    sessionStorage.setItem(this.authenticationKey, encryptedData);
  }

  hasRole(role: string) {
    return this.authentication.roles.indexOf(role) !== -1;
  }

  logout() {
    sessionStorage.removeItem(this.authenticationKey);
    this.createSalt();
    this.authentication = new AuthenticationModel();
    this.authenticationSubject.next(this.authentication);
  }

  getToken() {
    return this.authentication.token;
  }

}
