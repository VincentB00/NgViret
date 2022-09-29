import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserDialog } from './create-user-dialog.component';

describe('CreateUserDialogComponent', () => {
  let component: CreateUserDialog;
  let fixture: ComponentFixture<CreateUserDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
