/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddUserDialog } from './add-user-dialog.component';

describe('AddUserDialogComponent', () => {
  let component: AddUserDialog;
  let fixture: ComponentFixture<AddUserDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
