import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs';
import { ConfirmDialog } from '../dialog/confirm-dialog/confirm-dialog.component';
import { ItemDialog } from '../dialog/item-dialog/item-dialog.component';
import { HomeDetailComponent } from '../home/home-detail/home-detail.component';
import { Group } from '../shared/models/group.model';
import { Item } from '../shared/models/item.model';
import { ItemService } from '../shared/services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  @Input()
  homeDetail!: HomeDetailComponent;

  @Input()
  items!: Item[];

  constructor(
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
  }

  copyNotification(str: string): void
  {
    this.snackBar.open(str + " copied to Clipboard!", 'ok',{
      duration: 1000
    })
  }

  openItemDetail(item: Item): void
  {
    let dialog = this.matDialog.open(ItemDialog, {data: {item: structuredClone(item)}});

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if(res)
        {
          this.itemService.modifyItem(res).pipe(first()).subscribe(
            resT => {
              let index = this.items.findIndex((i) => i.id === res.id)
              this.items[index] = structuredClone(res);
            }
          );
        }
      }
    );
  }

  removeItem(item: Item): void
  {
    let dialog = this.matDialog.open(ConfirmDialog, {data: {title: 'Delete this item', message: 'you are about to pernament delete this item\nAre you sure?'}})
  
    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if(res)
        {
          this.itemService.deleteItem(item.id).pipe(first()).subscribe(
            res => {
              let index = this.items.findIndex((i) => i.id === item.id)
              this.items.splice(index, 1);
            }
          );
        }
      }
    );
  }
  
}
