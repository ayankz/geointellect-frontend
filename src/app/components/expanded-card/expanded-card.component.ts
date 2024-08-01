import {Component, Input} from '@angular/core';
import {Titles} from "./enums/titles";

@Component({
  selector: 'app-expanded-card',
  templateUrl: './expanded-card.component.html',
  styleUrl: './expanded-card.component.scss'
})
export class ExpandedCardComponent {
  @Input() title: string = '';
  @Input() open: boolean = false;
  @Input() description: string = '';
  @Input() imageUrl: string = '';

}
