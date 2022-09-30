import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  error: string = '';

  changePasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      reNewPassword: ['', Validators.required]
    }, {validators: [this.matchValidator]});

  }

  matchValidator({value: {newPassword, reNewPassword}}: FormGroup): null | {passwordNotMatch: string}
  {
    return newPassword === reNewPassword ? null : {passwordNotMatch: 'New Password and re-new Password does not match'};
  }

  changePassword(): void
  {
    this.userService.changePassword(this.changePasswordForm.value).subscribe(
      res => {
        this.error = '';
        this.changePasswordForm.reset();
        this.matDialog.open(ConfirmDialog, {data: {title: 'Password changed', message: 'Your password have been change', yes: 'ok', no: ''}});
      },
      error => {this.error = error.error.message}
    );
  }

}
