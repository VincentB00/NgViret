import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs';
import { GroupUser } from 'src/app/shared/models/group.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialog implements OnInit {


  groupUser: GroupUser = {
    group_id: 0,
    user_id: 0,
    authority: 'NORMAL',
    username: ''
  };

  usernameExist: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {groupID: number},
    private userService: UserService
  ) { }

  ngOnInit() {
    this.groupUser.group_id = this.data.groupID;
  }

  checkUsername(): void
  {
    if(this.groupUser.username)
      this.userService.isValidUsername(this.groupUser.username).pipe(first()).subscribe(
        res => {
          this.usernameExist = true;
          this.groupUser.user_id = +res.message;
        },
        error => this.usernameExist = false
      );
  }

}
