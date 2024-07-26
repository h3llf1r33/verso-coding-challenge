import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {VersoTerminalComponent} from "./components/verso-terminal/verso.terminal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VersoTerminalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'verso-coding-challenge';
}
