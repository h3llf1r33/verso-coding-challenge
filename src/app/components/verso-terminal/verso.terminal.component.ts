import {AfterViewInit, Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {BehaviorSubject, Subscription, tap} from "rxjs";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {VersoTerminalService} from "./verso.terminal.service";

@Component({
  selector: 'verso-terminal',
  templateUrl: 'verso.terminal.component.html',
  styleUrls: ['verso.terminal.component.sass'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    NgClass
  ],
  providers: [
    VersoTerminalService
  ],
  standalone: true
})
export class VersoTerminalComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() terminalService: VersoTerminalService = this._terminalService;
  private subscriptions = new Subscription()
  protected output = this.terminalService.output;
  protected isStopped = new BehaviorSubject<boolean>(false);
  protected isFullScreen$ = new BehaviorSubject<boolean>(false);
  protected inputFormControl = new FormControl('');
  protected rangeIteratorSubscription: Subscription | undefined;
  @ViewChild('terminalInput') terminalInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('terminalBody') private terminalBody: ElementRef<HTMLDivElement> | undefined;
  @HostBinding('class.is-fullscreen') isFullScreen = this.isFullScreen$.value


  constructor(public _terminalService: VersoTerminalService) {}

  ngAfterViewInit() {
    this.focusInputElement();
    this.focusLatestRow();
    this.subscriptions.add(this.isFullScreen$.subscribe({
      next: (value) => this.isFullScreen = value
    }));
  }

  ngOnInit() {
    this.startOutput();
  }

  ngOnDestroy() {
    this.stopOutput();
    this.subscriptions.unsubscribe()
  }

  getResolvedItems(arr: { value: number, label: string }[]) {
    return arr.filter((val: any) => !!val.label);
  }

  focusLatestRow(): void {
    setTimeout(() => {
      try {
        if (this.terminalBody) {
          this.terminalBody.nativeElement.scrollTop = this.terminalBody.nativeElement.scrollHeight;
        }
      } catch (err) {
      }
    }, 0);
  }

  startOutput() {
    this.rangeIteratorSubscription = this.terminalService.generateOutputListener().pipe(
      tap(() => this.focusLatestRow()),
    ).subscribe();
    this.subscriptions.add(this.rangeIteratorSubscription);
    this.isStopped.next(false);
    this.focusInputElement();
  }

  stopOutput() {
    this.rangeIteratorSubscription?.unsubscribe();
    this.isStopped.next(true);
    this.focusInputElement();
  }

  continueOrResetOutput() {
    if (typeof this.terminalService.currentNumber.value === 'number') {
      const nextValue = this.terminalService.currentNumber.value + 1;
      this.terminalService.startFrom.next((nextValue > this.terminalService.countTo.value) ? 1 : nextValue);
      this.startOutput();
    }
  }

  handleClose(): void {
    location.href = "https://www.linkedin.com/in/denis-bruns-9aa63a305"
  }

  handleResize(elem:Element): void {
    if (!document.fullscreenElement) {
      this.enterFullscreen(elem);
    } else {
      this.exitFullscreen();
    }
  }

  private enterFullscreen(elem: Element): void {
    if (elem.requestFullscreen) {
      elem.requestFullscreen().then(() => {
        this.isFullScreen$.next(true)
        this.focusInputElement();
      });
    }
  }

  private focusInputElement (): void {
    this.terminalInput?.nativeElement?.focus();
  }

  private exitFullscreen(): void {
    if (document.exitFullscreen) {
      document.exitFullscreen().then(()=>{
        this.focusInputElement();
      });
    }
    this.isFullScreen$.next(false);
  }

  protected readonly document = document;
}
