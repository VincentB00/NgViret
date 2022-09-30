import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { ValueGeneratorDialog } from 'src/app/dialog/value-generator-dialog/value-generator-dialog.component';

@Component({
  selector: 'app-value-generator-util',
  templateUrl: './value-generator-util.component.html',
  styleUrls: ['./value-generator-util.component.scss']
})
export class ValueGeneratorUtilComponent implements OnInit {

  @Output()
  valueEmitter = new EventEmitter<string>()

  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
  }

  generateValue(): void
  {
    let dialog = this.matDialog.open(ValueGeneratorDialog);

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if(res)
          this.valueEmitter.emit(res);
      }
    );
  }
}
