import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs';
import { AddUserDialog } from 'src/app/dialog/add-user-dialog/add-user-dialog.component';
import { ConfirmDialog } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { ItemDialog } from 'src/app/dialog/item-dialog/item-dialog.component';
import { Group, GroupUser } from 'src/app/shared/models/group.model';
import { Item } from 'src/app/shared/models/item.model';
import { User } from 'src/app/shared/models/user.model';
import { EncryptionService } from 'src/app/shared/services/encryption.service';
import { GroupService } from 'src/app/shared/services/group.service';
import { ItemService } from 'src/app/shared/services/item.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.scss']
})
export class HomeDetailComponent implements OnInit, OnChanges
{

  @Input()
  groupID: number = 0;

  items: Item[] = [];

  group!: Group;
  groupCopy!: Group;

  constructor(
    private userService: UserService,
    private itemService: ItemService,
    private matDialog: MatDialog,
    private groupService: GroupService,
    private es: EncryptionService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void 
  {

  }

  ngOnChanges(changes: SimpleChanges): void {
      this.updateItem();
      this.updateGroup();
  }

  updateGroup()
  {
    if(this.groupID)
    {
      this.groupService.getGroup(this.groupID).pipe(first()).subscribe(
        res => {
          this.group = res;

          this.userService.getMaskUser(this.groupID).pipe(first()).subscribe(
            res2 => {
              this.group.group_users.forEach((uT) => {
                let user = res2.find((u) => u.id! === uT.user_id);
                uT.username = user ? user.username : '';
              })
              this.groupCopy = structuredClone(this.group)
            }
          );
        }
      );
    }
  }

  updateItem()
  {
    if(this.groupID)
      this.itemService.getAll(this.groupID!).pipe(first()).subscribe(
        res => {
          this.items = [];
          res.forEach(item => {
            this.items.push(this.es.decryptObjectWithKey(item, item.publicKey!));
          })
        }
      );
  }

  addNewItem()
  {
    let dialog = this.matDialog.open(ItemDialog, {data: {}});

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if(res)
        {
          res.group_id = this.groupID;
          this.itemService.createNewItem(res).pipe(first()).subscribe(
            res => {
              this.items.push(this.es.decryptObject(res));
            }
          );
        }
      }
    );
  }

  getSize(data: string): number
  {
    if(!data)
      return 20;

    if(data.length <= 10)
      return 20
    else
      return data.length + 10;
  }

  addUser()
  {
    let dialog = this.matDialog.open(AddUserDialog, {data: {groupID: this.groupID}});

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if(res)
        {
          let groupUser: GroupUser = res;
          if(!(this.group.group_users.some(gu => gu.user_id === groupUser.user_id)))
            this.group.group_users.push(groupUser);
        }
      }
    );
  }

  deleteGroup(group: Group): void
  {
    let dialog = this.matDialog.open(ConfirmDialog, {data: {title: 'Delete Group?', message: 'you are about to delete this group and all it content\nAre you sure?'}})

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        this.groupService.deleteGroup(group.id!).pipe(first()).subscribe(
          res => {
            this.groupService.haveChange = true;
            this.groupID = 0;
          }
        );
      }
    );
    
  }

  isGroupChanges(): boolean
  {
    return JSON.stringify(this.group) === JSON.stringify(this.groupCopy);
  }

  saveGroup(): void
  {
    this.groupService.modifyGroup(this.group).pipe(first()).subscribe(
      res => {
        this.groupService.haveChange = true;
        this.groupCopy = structuredClone(this.group);
      }
    );
  }

  revertGroup(): void
  {
    this.group = structuredClone(this.groupCopy);
  }

  getUserAuthority(userID: number): string
  {
    let authority: string = '';

    if(!this.group || !this.group.group_users)
      return authority;

    this.group.group_users.forEach(u => {
      if(u.user_id === userID)
      {
        authority = u.authority;
      }
    })

    return authority;
  }

  removeUserFromGroup(user: GroupUser): void
  {
    let dialog = this.matDialog.open(ConfirmDialog, {data: {title: 'Remove this user from group?', message: 'this user will be removed from group?'}})

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if(res)
        {
          this.group.group_users = this.group.group_users.filter(gu => gu.id! !== user.id!);
        }
      }
    );
  }

  copyNotification(str: string): void
  {
    this.snackBar.open(str + " copied to Clipboard!", 'ok',{
      duration: 1000
    })
  }

  isGroupAdminOrOwner(): boolean
  {
    let authority = this.getUserAuthority(this.userService.getUser()!.id!);

    if(authority === 'OWNER' || authority === 'ADMIN')
      return true;
    else
      return false;
  }

  isGroupOwner(): boolean
  {
    let authority = this.getUserAuthority(this.userService.getUser()!.id!);

    if(authority === 'OWNER')
      return true;
    else
      return false;
  }
}
