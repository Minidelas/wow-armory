import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-auth-status',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="auth-status" [class.authenticated]="authService.authState().isAuthenticated"
                            [class.error]="authService.authState().error">
      <mat-icon>
        {{ getStatusIcon() }}
      </mat-icon>
      <span class="status-tooltip">
        {{ getStatusMessage() }}
      </span>
    </div>
  `,
  styles: [`
    .auth-status {
      position: fixed;
      top: 1rem;
      right: 1rem;
      padding: 0.5rem;
      border-radius: 50%;
      background: #333;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover .status-tooltip {
        opacity: 1;
        visibility: visible;
      }
    }

    .authenticated {
      background: #4CAF50;
      box-shadow: 0 0 10px #4CAF50;
    }

    .error {
      background: #f44336;
      box-shadow: 0 0 10px #f44336;
    }

    mat-icon {
      color: white;
      font-size: 20px;
      width: 20px;
      height: 20px;
      line-height: 20px;
    }

    .status-tooltip {
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      background: #333;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      margin-right: 1rem;
      font-size: 0.875rem;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      white-space: nowrap;
    }
  `]
})
export class AuthStatusComponent {
  protected readonly authService = inject(AuthService);

  protected getStatusIcon(): string {
    const state = this.authService.authState();
    if (state.isLoading) return 'sync';
    if (state.error) return 'error';
    return state.isAuthenticated ? 'check_circle' : 'account_circle';
  }

  protected getStatusMessage(): string {
    const state = this.authService.authState();
    if (state.isLoading) return 'Conectando...';
    if (state.error) return `Error: ${state.error}`;
    return state.isAuthenticated ? 'Conectado' : 'No conectado';
  }
} 