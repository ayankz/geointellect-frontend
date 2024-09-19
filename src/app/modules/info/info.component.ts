import { Component } from '@angular/core';
import { Titles } from '../../components/expanded-card/enums/titles';
import { Descriptions } from '../../components/expanded-card/enums/descriptions';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  protected readonly DESCRIPTION = Descriptions;
  getEnumValues(): string[] {
    return Object.values(Titles);
  }
}
