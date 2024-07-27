import {Component, signal} from '@angular/core';
@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.scss'
})
export class AccountInfoComponent {
  public subscribe: boolean = false;
  panelOpenState = signal(false);
}
