import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let fixture: ComponentFixture<CardComponent>;
  let component: CardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept title input', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    expect(component.title).toBe('Test Title');
  });

  it('should display title in template', () => {
    component.title = 'Test Title';
    component.username = 'testuser';
    fixture.detectChanges();
    const titleEl = fixture.nativeElement.querySelector('.title.is-4');
    expect(titleEl.textContent).toContain('Test Title');
  });
});
