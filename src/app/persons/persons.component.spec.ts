import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { first } from 'rxjs';
import { AppComponent } from '../app.component';
import { PersonalMessageComponent } from '../personal-message/personal-message.component';
import { PersonsComponent } from './persons.component';

describe('PersonsComponent', () => {
  let component: PersonsComponent;
  let fixture: ComponentFixture<PersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PersonalMessageComponent,
        PersonsComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
      ],
      providers: [PersonsComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onChange() should update #name', () => {  
    expect(component.name)
      .withContext('name at first')
      .toBe('');
    component.onChange('Anna');
    expect(component.name)
      .withContext("name changed to Anna")
      .toBe('Anna');
  })

  it('should render <h2>', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Which person do you want to greet?');
  });

  it('should render <label>', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('label').textContent).toContain('name:');
  });

  it('should render <button>', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Submit');
  });

  it('raises the selected event when submitted', () => {
    const name = 'Anna';
    component.name = name;
  
    component.nameSubmittedEventEmitter.pipe(first())
      .subscribe((submittedName: string) => expect(submittedName).toBe(name));
    component.onSubmit();
  });

  it('input should be validated', () => {
    expect(component.omit_special_char({charCode: 37}))
      .withContext("input of %")
      .toBeFalse();

    expect(component.omit_special_char({charCode: 56}))
      .withContext("input of number 8")
      .toBeFalse(); 

    expect(component.omit_special_char({charCode: 115}))
      .withContext("input of letter s")
      .toBeTrue();
  })
});
