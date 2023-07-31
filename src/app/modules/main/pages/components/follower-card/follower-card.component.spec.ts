/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FollowerCardComponent } from './follower-card.component';

describe('FollowerCardComponent', () => {
  let component: FollowerCardComponent;
  let fixture: ComponentFixture<FollowerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
