import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngSecretManager';

  constructor(public userService: UserService, private router: Router) {
    userService.autoUpdateUser();
  }

  logout()
  {
    this.userService.logout().subscribe(
      res => {this.router.navigate(['login'])}
    );
  }
}
