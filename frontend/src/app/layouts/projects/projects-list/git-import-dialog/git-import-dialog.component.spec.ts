import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GitImportDialogComponent } from './git-import-dialog.component';

describe('GitImportDialogComponent', () => {
  let component: GitImportDialogComponent;
  let fixture: ComponentFixture<GitImportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GitImportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GitImportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
