import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [],
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.scss',
})
export class ReportDetailsComponent {
  @Output() close = new EventEmitter();
  onClose() {
    this.close.emit();
  }
}
