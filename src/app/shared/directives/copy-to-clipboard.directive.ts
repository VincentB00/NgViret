import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Clipboard} from '@angular/cdk/clipboard';

@Directive({
  selector: '[appCopyToClipboard]'
})
export class CopyToClipboardDirective 
{

  @Input()
  copyToClipboardValue: any;

  @HostListener('click')
  onClick()
  {
    this.copyNotification(this.copyToClipboardValue);
  }

  constructor(private snackBar: MatSnackBar, private clipBoard: Clipboard) { }

  copyNotification(str: string): void
  {
    this.clipBoard.copy(str);
    this.snackBar.open(str + " copied to Clipboard!", 'ok',{
      duration: 1000
    })
  }

}
