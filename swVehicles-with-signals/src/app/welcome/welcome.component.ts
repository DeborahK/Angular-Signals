import { Component } from '@angular/core';

@Component({
  selector: 'sw-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
  public pageTitle = 'Welcome to Star Wars Vehicle Sales';

}
