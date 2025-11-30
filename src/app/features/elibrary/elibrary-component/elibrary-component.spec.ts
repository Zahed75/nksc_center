import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElibraryComponent } from './elibrary-component';

describe('ElibraryComponent', () => {
  let component: ElibraryComponent;
  let fixture: ComponentFixture<ElibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
