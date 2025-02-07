import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Realm {
  id: number;
  name: string;
  slug: string;
  region: string;
}

@Injectable({
  providedIn: 'root'
})
export class RealmsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.blizzardApi.baseUrl;

  getRealms(): Observable<Realm[]> {
    return this.http.get<any>(
      `${this.baseUrl}/data/wow/realm/index`,
      { 
        params: { 
          namespace: 'dynamic-eu',
          locale: 'es_ES'
        }
      }
    ).pipe(
      map(response => response.realms)
    );
  }
} 