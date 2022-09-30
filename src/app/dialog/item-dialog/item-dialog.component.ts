import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs';
import { Item, ItemStorage } from 'src/app/shared/models/item.model';
import { ValueGeneratorDialog } from '../value-generator-dialog/value-generator-dialog.component';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialog implements OnInit {

  item!: Item;

  urlVisibility: boolean = true;
  usernameVisibility: boolean = true;
  passwordVisibility: boolean = false;
  authenticatorKeyVisibility: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {item?: Item},
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  )
  {
    if(data.item)
      this.item = structuredClone(data.item)
    else
    {
      this.item = {
        id: 0,
        name:             '',
        username:         '',
        password:         '',
        authenticatorKey: '',
        url:              '',
        note:             '',
        group_id:         0,
        itemStorages:     []
      }
    }
  }

  ngOnInit(): void {
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

  isChange(): boolean
  {
    return JSON.stringify(this.item) === JSON.stringify(this.data.item);
  }

  getLineHeight(value: string): number
  {
    let lines: string[] = value.split('\n');

    // return (lines.length * 21) + 'px';

    return lines.length + 1;
  }

  addField()
  {
    let itemStorage: ItemStorage = {
      id: 0,
      name: 'Field ' + (this.item.itemStorages.length + 1),
      value: '',
      item_id: this.item.id
    }
    this.item.itemStorages.push(itemStorage);
  }

  remove(itemStorage: ItemStorage): void
  {
    this.item.itemStorages = this.item.itemStorages.filter((is) => is.name !== itemStorage.name);
  }
}
