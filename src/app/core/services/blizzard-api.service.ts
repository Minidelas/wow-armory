import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Character } from '../models/character.interface';

@Injectable({
  providedIn: 'root'
})
export class BlizzardApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.blizzardApi.baseUrl;

  getCharacter(realm: string, characterName: string): Observable<Character> {
    return this.http.get<Character>(
      `${this.baseUrl}/profile/wow/character/${realm}/${characterName}`,
      { params: { namespace: 'profile-eu' } }
    );
  }

  // Añadir más métodos según necesites
} 