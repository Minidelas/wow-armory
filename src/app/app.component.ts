import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStatusComponent } from './shared/components/auth-status/auth-status.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    // Si no hay token almacenado, iniciamos el proceso de autenticación
    // if (!this.authService.getToken()) {
    //   this.authService.login();
    // }
  }
}
