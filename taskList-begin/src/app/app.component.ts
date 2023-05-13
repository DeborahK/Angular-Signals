import { Component } from '@angular/core';
import { UserShellComponent } from './users/user-shell/user-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserShellComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'User Tasks';
}
