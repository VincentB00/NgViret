import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueGeneratorDialog } from './value-generator-dialog.component';

describe('ValueGeneratorDialogComponent', () => {
  let component: ValueGeneratorDialog;
  let fixture: ComponentFixture<ValueGeneratorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueGeneratorDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValueGeneratorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
