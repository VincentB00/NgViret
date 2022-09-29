import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first, Observable, of, pluck } from 'rxjs';
import { CreateUserDialog } from '../dialog/create-user-dialog/create-user-dialog.component';
import { UserDetailDialog } from '../dialog/user-detail-dialog/user-detail-dialog.component';
import { Response, User, UserRole, UserTable } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.scss']
})
export class AccountManagerComponent implements OnInit, AfterViewInit
{
  userData: UserTable[] = [];
  displayedColumns: string[] = ['id', 'username', 'password', 'email', 'accountNonExpired', 'accountNonLocked', 'credentialsNonExpired', 'enabled', 'userRoles'];
  dataSource = new MatTableDataSource(this.userData);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private matDialog: MatDialog
    ) { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void 
  {
    this.updateUser();
  }

  updateUser()
  {
    this.userService.getAllUser().pipe(first()).subscribe(
      res => {
      this.userData = [];
      res.forEach((u) => {
        this.userData.push(this.convertUserData(u));
        this.dataSource.data = this.userData;
      })
    });
  }

  convertUserData(user: User): UserTable
  {
    let userTable: UserTable = {
      id:                    user.id,
      username:              user.username,
      password:              user.password,
      email:                 user.email,
      accountNonExpired:     user.accountNonExpired!,
      accountNonLocked:      user.accountNonLocked!,
      credentialsNonExpired: user.credentialsNonExpired!,
      enabled:               user.enabled!,
      userRoles:             this.getRole(user.userRoles!),
    }

    return userTable;
  }

  private getRole(userRoles: UserRole[])
  {
    let result: string[] = [];
    userRoles.forEach(r => result.push(r.authority))
    return result.join(', ');
  }

  sortData(sortState: Sort) 
  {
    console.log(sortState)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter()
  {
    this.dataSource.filter = '';

    if (this.dataSource.paginator) 
    {
      this.dataSource.paginator.firstPage();
    }
  }

  createNewUser(): void
  {
    let dialog = this.matDialog.open(CreateUserDialog);

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        this.updateUser();
      }
    );
  }
  
  editUser(row: UserTable)
  {
    let dialog = this.matDialog.open(UserDetailDialog, {data: {userID: row.id}});

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if(res)
        {
          let index = this.dataSource.data.indexOf(row);

          this.userService.getUserByID(row.id!).pipe(first()).subscribe(
            res => {
              this.updateUser();
            }
          );
        }
      }
    );
  }


}
