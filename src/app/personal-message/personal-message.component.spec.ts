import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Observable, of, throwError } from 'rxjs';
import { AppComponent } from '../app.component';
import { Message } from '../message';
import { PersonsComponent } from '../persons/persons.component';
import { MessageService } from '../services/message.service';
import { PersonalMessageComponent } from './personal-message.component';

describe('PersonalMessageComponent', () => {
  let component: PersonalMessageComponent;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MessageService', ['getHelloByName']);
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
      providers: [
        PersonsComponent, 
        PersonalMessageComponent,
        MessageService, { provide: MessageService, useValue: spy}],
    })
    .compileComponents();

    component = TestBed.inject(PersonalMessageComponent);
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render <h3>', () => {
    const fixture = TestBed.createComponent(PersonalMessageComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Message: ');
  });

  it('should render empty message onInit', () => {
    const fixture = TestBed.createComponent(PersonalMessageComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    expect(comp.message.message).toBe('');
  });

  it('should change message when submitted', () => {
    const stubValue = 'Test';
    const expectedMessage : Message = {message: "Hello " + stubValue};
    messageServiceSpy.getHelloByName.and.returnValue(of(expectedMessage));

    const fixture = TestBed.createComponent(PersonalMessageComponent);
    const spanElement = fixture.debugElement.nativeElement.querySelector('span');
    expect(spanElement).toBeTruthy();
    
    component.displayMessage(stubValue);
    fixture.detectChanges();
    fixture.whenStable().then(res => {
      const spanElement = fixture.debugElement.nativeElement.querySelector('span');
      expect(spanElement.value).toEqual(expectedMessage.message);
      expect(component.message.message).toEqual(expectedMessage.message);
      expect(messageServiceSpy.getHelloByName.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
      messageServiceSpy.getHelloByName.calls.mostRecent().returnValue
        .subscribe(result => expect(result).toEqual(expectedMessage));
      })
  });
});
