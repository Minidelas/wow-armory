import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStatusComponent } from '../../shared/components/auth-status/auth-status.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    RouterLink,
    AuthStatusComponent
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {} 