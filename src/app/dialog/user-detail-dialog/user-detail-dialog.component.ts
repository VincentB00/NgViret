import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { ValueGeneratorDialog } from '../value-generator-dialog/value-generator-dialog.component';

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.scss']
})
export class UserDetailDialog implements OnInit {

  user!: User
  userClone!: User;

  usernameExist: boolean = false;

  passwordVisibility: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {userID: number},
    private dialogRef: MatDialogRef<UserDetailDialog>,
    private userService: UserService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    let id = this.data.userID;
    this.userService.getUserByID(id).pipe(first()).subscribe(
      res => {
        this.user = res; 
        this.userClone = structuredClone(res);
        console.log(this.user);
      },
      error => this.dialogRef.close()
    );
  }

  getSize(data: string): number
  {
    if(!data)
      return 10

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

  isValueChange(): boolean
  {
    return JSON.stringify(this.user) !== JSON.stringify(this.userClone);
  }

  revert()
  {
    this.user = structuredClone(this.userClone);
  }

  save(): void
  {
    this.userService.modifyUser(this.user).pipe(first()).subscribe(
      res => {this.dialogRef.close('save')},
      err => {window.alert('Technicle difficulty, please try again latter');this.dialogRef.close('');}
    );
  }



}
