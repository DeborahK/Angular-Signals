import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { UserTodosComponent } from "../../todos/user-todos/user-todos.component";

@Component({
  selector: 'app-user-shell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class='row'>
    <div class='col-md-4'>
      <app-user-list></app-user-list>
    </div>
    <div class='col-md-8'>
      <app-user-todos></app-user-todos>
    </div>
</div>
  `,
  imports: [UserListComponent, UserTodosComponent]
})
export class UserShellComponent {

}
