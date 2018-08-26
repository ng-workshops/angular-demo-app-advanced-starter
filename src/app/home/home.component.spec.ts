import { HomeComponent } from './home.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

describe('AppComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('GIVEN the app is started', () => {
    it('THEN the APP component should be defined', () => {
      expect(component).toBeDefined();
    });
  });
});
