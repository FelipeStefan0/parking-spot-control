import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciadorComponent } from './gerenciador.component';

describe('GerenciadorComponent', () => {
  let component: GerenciadorComponent;
  let fixture: ComponentFixture<GerenciadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
