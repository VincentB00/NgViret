import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  user!: User;
  userCopy!: User;

  constructor(private userService: UserService) { }

  ngOnInit()
  {
    this.updateSetting();
  }

  async updateSetting()
  {
    await this.userService.checkIsLogin();
    this.user = this.userService.getUser()!;
    this.userCopy = structuredClone(this.user);
  }

  save(): void
  {
    this.userService.modifyCurrentLoginUser(this.user).pipe(first()).subscribe(
      res => {this.userCopy = structuredClone(this.user)},
      error => {this.userService.handleError(error)}
    );
  }

  revert(): void
  {
    this.user = structuredClone(this.userCopy);
  }

  isChange(): boolean
  {
    return JSON.stringify(this.user) !== JSON.stringify(this.userCopy);
  }

}
