import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesBoardComponent } from './files-board.component';

describe('FilesBoardComponent', () => {
  let component: FilesBoardComponent;
  let fixture: ComponentFixture<FilesBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
