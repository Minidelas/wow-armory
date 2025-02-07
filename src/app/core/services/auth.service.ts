import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly clientId = environment.blizzardApi.clientId;
  private readonly clientSecret = environment.blizzardApi.clientSecret;
  private readonly region = environment.blizzardApi.region;
  private readonly redirectUri = environment.production 
    ? 'https://minidelas.github.io/wow-armory/oauth/callback'
    : `${window.location.origin}/oauth/callback`;
  
  public readonly authState = signal<AuthState>({
    isAuthenticated: false,
    isLoading: false,
    error: null
  });

  constructor(private http: HttpClient) {
    this.checkInitialAuth();
  }

  private generateRandomState(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  login(): void {
    const state = this.generateRandomState();
    localStorage.setItem('oauth_state', state);

    const authUrl = `https://${this.region}.battle.net/oauth/authorize`;
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: 'wow.profile',
      state: state
    });

    window.location.href = `${authUrl}?${params.toString()}`;
  }

  handleCallback(code: string, state: string): Observable<boolean> {
    const savedState = localStorage.getItem('oauth_state');
    localStorage.removeItem('oauth_state');

    if (!state || state !== savedState) {
      this.authState.set({
        isAuthenticated: false,
        isLoading: false,
        error: 'Error de validación de estado'
      });
      return of(false);
    }

    const tokenUrl = `https://${this.region}.battle.net/oauth/token`;
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this.redirectUri,
      scope: 'wow.profile'
    });

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`));

    return this.http.post<any>(tokenUrl, body.toString(), { headers }).pipe(
      map(response => {
        if (response.access_token) {
          this.setToken(response.access_token);
          this.authState.set({
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          return true;
        }
        return false;
      }),
      catchError(error => {
        this.authState.set({
          isAuthenticated: false,
          isLoading: false,
          error: 'Error al obtener el token'
        });
        return of(false);
      })
    );
  }

  private checkInitialAuth(): void {
    const token = this.getToken();
    if (token) {
      this.validateToken(token).subscribe();
    }
  }

  private validateToken(token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any>(`https://${this.region}.battle.net/oauth/userinfo`, { headers }).pipe(
      map(() => {
        this.authState.set({
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
        return true;
      }),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('bnet_token');
    this.authState.set({
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  }

  setToken(token: string): void {
    localStorage.setItem('bnet_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('bnet_token');
  }
} 