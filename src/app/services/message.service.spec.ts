import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Data } from "@angular/router";
import { defer, of, take, throwError } from "rxjs";
import { Message } from "../message";
import { MessageService } from "./message.service";

/* export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
} */

describe('MessageService', () => {

    let messageService : MessageService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    let httpTestingController: HttpTestingController;
    let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    messageService = new MessageService(httpClientSpy);

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should return expected message with name (HttpClient called once)', (done: DoneFn) => {
    const testData: Message = {message: 'Hello Anna'};
  
    httpClientSpy.get.and.returnValue(of(testData));

    messageService.getHelloByName("Anna").subscribe(
      {next: data => {
        expect(data)
          .withContext('expected message')
          .toEqual(testData);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should return expected message without name (HttpClient called once)', (done: DoneFn) => {
    const testData: Message = {message: 'Hello from RESTEasy Reactive'};
  
    httpClientSpy.get.and.returnValue(of(testData));
  
    messageService.getHelloByName("").subscribe(
      {next: data => {
        expect(data)
          .withContext('expected message')
          .toEqual(testData);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('can test for network error', done => {
    // Create mock ProgressEvent with type `error`, raised when something goes wrong
    // at network level. e.g. Connection timeout, DNS error, offline, etc.
    const mockError = new ProgressEvent('error');
    const testUrl =  'http://localhost:8080/test'
    
    httpClient.get<Data[]>(testUrl).subscribe({
      next: () => fail('should have failed with the network error'),
      error: (error: HttpErrorResponse) => {
        expect(error.error).toBe(mockError);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(testUrl);
  
    // Respond with mock error
    req.error(mockError);
  });

  it('#handleError works',  () => {
    spyOn(messageService, 'handleError').and.callThrough();
    const mockError = new ProgressEvent('error');

    messageService.handleError(mockError);
    expect(messageService.handleError).toHaveBeenCalled();
    
    messageService.handleError(mockError).subscribe({
      next:(data:Message) => { 
        const message = {
          message: (data as any) .message,
        }
        expect(message.message).toBe("An error has occured. Please try again.")
      }
    });
  })
})
