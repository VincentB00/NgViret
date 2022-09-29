import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TouchBarService 
{

  displayMenu: boolean = true;
  displayItemDetail: boolean = true;

  constructor() { }

}
