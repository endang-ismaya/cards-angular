import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 posts', () => {
    expect(component.posts.length).toBe(3);
  });

  it('should render cards', () => {
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('app-card');
    expect(cards.length).toBe(3);
  });
});
