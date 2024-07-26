import {Injectable, signal} from "@angular/core";
import {BehaviorSubject, concatMap, delay, of, range, tap} from "rxjs";

@Injectable()
export class VersoTerminalService {
  public output = signal<{ value: number, label: string }[]>([]);
  public debounceTime = new BehaviorSubject<number>(500);
  public startFrom = new BehaviorSubject<number>(1);
  public countTo = new BehaviorSubject<number>(100);
  public currentNumber = new BehaviorSubject<number | null>(null);

  resolveLabel(value: number) {
    if (value % 3 === 0 && value % 5 === 0) {
      return 'FizzBuzz';
    } else if (value % 3 === 0) {
      return 'Fizz';
    } else if (value % 5 === 0) {
      return 'Buzz';
    }
    return '';
  }

  generateOutputListener() {
    return range(this.startFrom.value, this.countTo.value).pipe(
      concatMap((value, index) => of(value).pipe(
        delay(this.debounceTime.value),
        tap(() => {
          if (value <= this.countTo.value) {
            this.currentNumber.next(value);
            this.output.update((val) => {
              val?.push({value: value, label: this.resolveLabel(value)});
              return val;
            });
          }
        }),
      )),
    );
  }

}
