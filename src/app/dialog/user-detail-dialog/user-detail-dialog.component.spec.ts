/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserDetailDialog } from './user-detail-dialog.component';

describe('UserDetailDialogComponent', () => {
  let component: UserDetailDialog;
  let fixture: ComponentFixture<UserDetailDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
