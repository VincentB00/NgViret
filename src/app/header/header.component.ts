import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user.model';
import { TouchBarService } from '../shared/services/touch-bar.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {

  @Input()
  drawer!: MatDrawer;

  path!: string;

  constructor(
    public userService: UserService, 
    private ar: ActivatedRoute,
    public touchBar: TouchBarService
    ) { }

  ngOnInit(): void 
  {
    this.checkPath();
  }

  ngDoCheck(): void 
  {
    this.checkPath();
  }

  checkPath()
  {
    if(this.ar.snapshot.children.length > 0 && this.ar.snapshot.children[0].routeConfig?.path)
      this.path = this.ar.snapshot.children[0].routeConfig?.path;
    else 
      this.path = '';
  }

}
