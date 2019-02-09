import { Component } from '@angular/core';
import {StateServiceService} from './state-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (public state: StateServiceService) {}

}
