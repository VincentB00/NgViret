import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { first, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { ValueGeneratorDialog } from '../value-generator-dialog/value-generator-dialog.component';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss']
})
export class CreateUserDialog implements OnInit {

  usernameExist: boolean = false;

  user: User = {
    username: '',
    password: '',
    email: ''
  }

  passwordVisibility: boolean = false;

  constructor(
    private matDialog: MatDialog, 
    private userService: UserService,
    private dialogRef: MatDialogRef<CreateUserDialog>) { }

  ngOnInit(): void {
  }

  createNewUser(): void
  {
    this.userService.registerUser(this.user).pipe(first()).subscribe(
      res => this.dialogRef.close()
    );
  }

  getSize(data: string): number
  {
    if(data.length <= 10)
      return 30
    else
      return data.length + 20;
  }

  getVisibility(condition: boolean): string
  {
    return condition === true ? 'text' : 'password';
  }

  generateValue(): void
  {
    let dialog = this.matDialog.open(ValueGeneratorDialog);

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if(res)
          this.user.password = res;
      }
    );
  }

  checkUsername(): void
  {
    if(this.user.username)
      this.userService.isValidUsername(this.user.username).pipe(first()).subscribe(
        res => this.usernameExist = true,
        error => this.usernameExist = false
      );
  }

}
