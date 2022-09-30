import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldAppearance, MatFormFieldDefaultOptions } from '@angular/material/form-field';



@Component({
  selector: 'app-mat-form-field-input',
  templateUrl: './mat-form-field-input.component.html',
  styleUrls: ['./mat-form-field-input.component.scss']
})
export class MatFormFieldInputComponent implements OnInit
{
  
  @Input()
  value: string = '';

  @Output()
  valueOutput: EventEmitter<string> = new EventEmitter();

  @Input()
  placeholder: string = '';

  @Input()
  appearance: string = 'fill';

  @Input()
  matColor: string = 'primary';

  @Input()
  width: number = 40;

  @Input()
  label: string = '';

  @Input()
  styleWidth?: string;
  
  @Input()
  required: boolean = false;

  @Input()
  autoResize: boolean = false;

  @Input()
  disable: boolean = false;

  @Input()
  showGoto: boolean = false;

  @Input()
  showVisibleSwitch: boolean = true;

  @Input()
  showCopyToClipboard: boolean = true;

  @Input()
  showGenerateValue: boolean = true;

  //input copy
  @Input()
  copyDisplayMessage: string = this.value;

  //switch
  @Input()
  switchVisibility: boolean = true;

  @Input()
  defaultType: string = 'text';

  @Input()
  switchType: string = 'password';

  @Input()
  onIcon: string = 'visibility';

  @Input()
  offIcon: string = 'visibility_off';

  constructor() { }

  ngOnInit() {
  }

  emitValue(): void
  {
    this.valueOutput.emit(this.value);
  }

  clear(): void
  {
    this.value = '';
    this.valueOutput.emit(this.value);
  }

  getSize(data: string): number
  {
    let offset = 10;
    if(this.showCopyToClipboard)
      offset += 5;
    if(this.showGenerateValue)
      offset += 5;
    if(this.showGoto)
      offset += 5;
    if(this.showVisibleSwitch)
      offset += 5;
    
    if(!this.autoResize)
      return this.width;

    if(data.length <= 10)
      return this.width;
    else
      return data.length + offset;
  }

  getAppearance(): MatFormFieldAppearance
  {
    let appearance: MatFormFieldAppearance = 'fill';
    switch(this.appearance.toLowerCase())
    {
      case 'legacy':
      case '0':
        appearance = 'legacy'
        break;
        
      case 'standard':
      case '1':
        appearance = 'standard'
        break;

      case 'fill':
      case '2':
        appearance = 'fill'
        break;

      case 'outline':
      case '3':
        appearance = 'outline'
        break;

      default:
        break;
    }

    return appearance;
  }

  openLink(link: string): void
  {
    window.open(link);
  }
  
}
