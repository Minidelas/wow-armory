import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [MatProgressSpinner],
  template: `
    <div class="callback-container">
      <mat-spinner></mat-spinner>
      <p>Autenticando...</p>
    </div>
  `,
  styles: [`
    .callback-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      gap: 1rem;
    }
  `]
})
export class CallbackComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      const state = params['state'];

      if (code && state) {
        this.authService.handleCallback(code, state).subscribe({
          next: (success) => {
            if (success) {
              this.router.navigate(['/search']);
            } else {
              this.handleError();
            }
          },
          error: () => this.handleError()
        });
      } else {
        this.handleError();
      }
    });
  }

  private handleError(): void {
    this.snackBar.open('Error en la autenticación', 'Cerrar', {
      duration: 5000
    });
    this.router.navigate(['/']);
  }
} 