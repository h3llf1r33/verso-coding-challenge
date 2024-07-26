import {TestBed} from '@angular/core/testing';
import {VersoTerminalService} from "./verso.terminal.service";


describe('VersoTerminalService', () => {
  let service: VersoTerminalService;

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
    TestBed.configureTestingModule({
      providers: [VersoTerminalService]
    });
    service = TestBed.inject(VersoTerminalService);
  });

  it('should resolve labels correctly', () => {
    expect(service.resolveLabel(1)).toEqual('');
    expect(service.resolveLabel(3)).toEqual('Fizz');
    expect(service.resolveLabel(5)).toEqual('Buzz');
    expect(service.resolveLabel(15)).toEqual('FizzBuzz');
  });

  it('should generate and emit output as expected', (done) => {
    service.startFrom.next(1);
    service.countTo.next(15);
    service.generateOutputListener().subscribe({
      complete: () => {
        expect(service.output()).toEqual([
          {value: 1, label: ''},
          {value: 2, label: ''},
          {value: 3, label: 'Fizz'},
          {value: 4, label: ''},
          {value: 5, label: 'Buzz'},
          {value: 6, label: 'Fizz'},
          {value: 7, label: ''},
          {value: 8, label: ''},
          {value: 9, label: 'Fizz'},
          {value: 10, label: 'Buzz'},
          {value: 11, label: ''},
          {value: 12, label: 'Fizz'},
          {value: 13, label: ''},
          {value: 14, label: ''},
          {value: 15, label: 'FizzBuzz'},
        ]);
        done();
      }
    });
  });
});
