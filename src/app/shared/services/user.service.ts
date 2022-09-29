import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { first, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, Response } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService 
{

  private currentUser: User | undefined | null;

  constructor(private httpClient: HttpClient, private router: Router) { }

  isAdminOrOwner(): boolean
  {
    return this.isAdmin() || this.isOwner();
  }

  isAdmin(): boolean
  {
    if(!this.isLogin())
      return false;

    return this.getCurrentLoginUser().userRoles!.some((r) => r.authority.toLowerCase() === "admin");
  }

  isOwner(): boolean
  {
    if(!this.isLogin())
      return false;

    return this.getCurrentLoginUser().userRoles!.some((r) => r.authority.toLowerCase() === "owner");
  }

  // autoCheckAllUserRoles(roles: string[], redirect: string[]): void
  // {
  //   roles.forEach((role) => {
  //     for (const [key, value] of Object.entries(this.rolesStack)) 
  //     {
  //       let isAcceptRole = value();
  //       if(key === role && !isAcceptRole)
  //         this.router.navigate(redirect);
  //     }
  //   })
  // }

  // autoCheckAnyUserRoles(roles: string[], redirect: string[]): void
  // {
  //   let found = false;
  //   roles.forEach((role) => {
  //     if(found)
  //       return;
  //     for (const [key, value] of Object.entries(this.rolesStack)) 
  //     {
  //       let isAcceptRole = value();
  //       if(key === role && isAcceptRole)
  //       {
  //         found = true;
  //         break;
  //       }
  //     }
  //   })

  //   if(!found)
  //     this.router.navigate(redirect);
  // }

  autoCheckSessionLogin()
  {
    this.httpClient.get<User>(`${environment.api}/users`,{withCredentials: true})
    .pipe(first()).subscribe(
      res => {this.currentUser = res},
      error => {this.clearUser()}
    );
  }

  clearUser()
  {
    this.currentUser = null;
    this.router.navigate(['/login']).catch();
  }

  private async updateUser()
  {
    return new Promise<void>((resolve, reject) => {
      this.httpClient.get<User>(`${environment.api}/users`,{withCredentials: true})
      .pipe(first()).subscribe(
        res => {this.currentUser = res},
        error => {this.currentUser = null},
        () => resolve()
      );
    });
  }

  async autoUpdateUser()
  {
    const updateUser = await this.updateUser().then().catch();
  }

  getUser(): User | undefined | null
  {
    // this.checkIsLogin();
    return this.currentUser;
  }

  isLogin(): boolean
  {
    return this.currentUser !== undefined && this.currentUser !== null;
  }

  async checkIsLogin()
  {
    await this.autoUpdateUser();
    if(!this.currentUser)
    {
      this.router.navigate(['login']);
    }
  }

  login(currentUser: {username: string, password: string}): Observable<Response>
  {
    const currentUserFormData = new HttpParams()
      .append('username', currentUser.username)
      .append('password', currentUser.password);
    
    return this.httpClient.post<Response>(
      `${environment.api}/login`,
      currentUserFormData,
    )
  }

  logout(): Observable<Response>
  {
    this.clearUser();
    return this.httpClient.get<Response>
    (
      `${environment.api}/logout`,
    )
  }

  getCurrentLoginUser(): User
  {
    return this.currentUser!;
  }

  getCopyOfCurrentLoginUser(): User
  {
    return structuredClone(this.getCurrentLoginUser());
  }
  
  isValidUsername(currentUsername: string): Observable<Response>
  {
    return this.httpClient.get<Response>(`${environment.api}/users/exist/${currentUsername}`);
  }

  registerUser(user: User): Observable<Response>
  {
    return this.httpClient.post<Response>(`${environment.api}/users`, user);
  }

  modifyCurrentLoginUser(user: User): Observable<Response>
  {
    return this.httpClient.put<Response>(`${environment.api}/users`, user);
  }

  modifyUser(user: User): Observable<Response>
  {
    return this.httpClient.put<Response>(`${environment.api}/users/${user.id}`, user);
  }

  getMaskUser(groupID: number): Observable<User[]>
  {
    return this.httpClient.get<User[]>(`${environment.api}/users/all/mask/${groupID}`);
  }

  getAllUser(): Observable<User[]>
  {
    return this.httpClient.get<User[]>(`${environment.api}/users/all`);
  }

  getUserByID(userID: number): Observable<User>
  {
    return this.httpClient.get<User>(`${environment.api}/users/${userID}`);
  }

  handleError(error: any)
  {
    let status = error.status;
    
    if(status)
    {
      if(+status === 401)
        this.clearUser();
      else if(+status === 403)
        this.router.navigate(['/home']).catch();
    }
  }
}
