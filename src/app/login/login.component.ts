import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, DoCheck {

  loginForm!: FormGroup;

  error: string = '';

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngDoCheck()
  {
    if(this.userService.isLogin())
      this.router.navigate(['home']);
  }

  ngOnInit(): void 
  {
    this.loginForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }

  login()
  {
    this.userService.login(this.loginForm.value).pipe(first()).subscribe(
      async res => {
        await this.userService.autoUpdateUser(); 
        this.router.navigate(['home'])
      },
      error => {this.error = 'invalid or wrong username or password'}
    );
  }
}
