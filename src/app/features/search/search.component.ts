import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { RealmsService, Realm } from '../../core/services/realms.service';
import { BlizzardApiService } from '../../core/services/blizzard-api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule
  ],
  template: `
    <div class="search-container">
      <h2>Buscar Personaje</h2>
      
      <div class="search-form">
        <mat-form-field appearance="fill">
          <mat-label>Reino</mat-label>
          <input type="text"
                 matInput
                 [matAutocomplete]="auto"
                 [(ngModel)]="selectedRealm"
                 placeholder="Selecciona un reino">
          <mat-autocomplete #auto="matAutocomplete">
            <mat-option *ngFor="let realm of realms" [value]="realm.slug">
              {{ realm.name }}
            </mat-option>
          </mat-autocomplete>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Nombre del Personaje</mat-label>
          <input matInput [(ngModel)]="characterName" placeholder="Introduce el nombre">
        </mat-form-field>

        <button mat-raised-button color="primary" 
                (click)="searchCharacter()"
                [disabled]="!selectedRealm || !characterName">
          Buscar
        </button>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .search-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    mat-form-field {
      width: 100%;
    }
  `]
})
export class SearchComponent {
  private readonly realmsService = inject(RealmsService);
  private readonly blizzardService = inject(BlizzardApiService);
  private readonly router = inject(Router);

  protected realms: Realm[] = [];
  protected selectedRealm = '';
  protected characterName = '';

  ngOnInit(): void {
    this.realmsService.getRealms().subscribe(realms => {
      this.realms = realms;
    });
  }

  searchCharacter(): void {
    if (this.selectedRealm && this.characterName) {
      this.router.navigate(['/character', this.selectedRealm, this.characterName.toLowerCase()]);
    }
  }
} 