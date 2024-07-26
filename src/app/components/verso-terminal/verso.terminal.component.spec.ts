import {VersoTerminalComponent} from "./verso.terminal.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {VersoTerminalService} from "./verso.terminal.service";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

describe('VersoTerminalComponent', () => {
  let component: VersoTerminalComponent;
  let fixture: ComponentFixture<VersoTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [VersoTerminalService],
      imports: [ReactiveFormsModule, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VersoTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
