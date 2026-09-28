import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadList } from './download-list';

describe('DownloadList', () => {
  let component: DownloadList;
  let fixture: ComponentFixture<DownloadList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadList],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
