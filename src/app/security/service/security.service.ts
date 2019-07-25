import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Api} from '../../api';
import {Router} from '@angular/router';
import {CryptoService} from '../../shared/service/crypto.service';
import {BehaviorSubject, interval, Observable, Subscription} from 'rxjs';
import {AuthenticationModel} from '../model/authentication.model';
import {map, mergeMap, shareReplay} from 'rxjs/operators';
import uuid from 'uuid/v4';
import {AccountModel} from '../model/account.model';

@Injectable()
export class SecurityService {

  private readonly authenticationKey = 'client_id';
  private readonly saltKey = 'app_id';
  private readonly clientId = 'books';
  private refreshTokenSubscription: Subscription;

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
      this.startRefreshingToken();
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
    const payload = this.prepareLoginPayload(username, password);
    const authenticationChanges = this.retrieveToken(payload).pipe(shareReplay(1));
    const accountChanges = authenticationChanges.pipe(mergeMap(() => this.retrieveAccount())).pipe(shareReplay(1));
    authenticationChanges.subscribe(
      (authentication) => this.authentication = authentication,
      (error) => console.log('Login failed', error));
    accountChanges.subscribe(
      (account) => {this.updateSecurityContext(account);  this.startRefreshingToken();},
      (error) => console.log('Account loading failed', error));
    return accountChanges;
  }

  private prepareLoginPayload(username: string, password: string): string {
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

  private updateSecurityContext(account: AccountModel = new AccountModel()) {
    const salt = this.loadSalt();
    this.authentication.username = account.login || this.authentication.username;
    this.authentication.roles = account.roles || ['user'];
    this.authenticationSubject.next(this.getPublicAuthentication());
    const encryptedData = this.cryptoService.set(this.shuffleSalt(salt), JSON.stringify(this.authentication));
    sessionStorage.setItem(this.authenticationKey, encryptedData);
  }

  hasRole(role: string) {
    return this.authentication.roles.indexOf(role) !== -1;
  }

  logout() {
    if (this.refreshTokenSubscription) {
      this.refreshTokenSubscription.unsubscribe();
      this.refreshTokenSubscription = null;
    }
    sessionStorage.removeItem(this.authenticationKey);
    this.createSalt();
    this.authentication = new AuthenticationModel();
    this.authenticationSubject.next(this.authentication);
    this.router.navigateByUrl("login");
  }

  getToken() {
    return this.authentication.token;
  }

  private startRefreshingToken() {
    if (!this.refreshTokenSubscription) {
      this.refreshTokenSubscription = interval(1 * 60 * 1000)
        .subscribe(() => this.refreshToken());
    }
  }

  private refreshToken() {
    const payload = this.prepareRefreshTokenPayload();
    this.retrieveToken(payload)
      .subscribe((authentication) => {
        this.authentication.token = authentication.token;
        this.authentication.refreshToken = authentication.refreshToken;
        this.updateSecurityContext();
      });
  }

  private prepareRefreshTokenPayload(): string {
    const payload = new URLSearchParams();
    payload.set('refresh_token', this.authentication.refreshToken);
    payload.set('grant_type', 'refresh_token');
    payload.set('client_id', this.clientId);
    return payload.toString();
  }

}
