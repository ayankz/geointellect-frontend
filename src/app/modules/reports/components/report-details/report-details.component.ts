import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { ReportService } from '../../../../services/report.service';
import { DatePipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [NgIf, DatePipe, NgForOf],
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.scss',
})
export class ReportDetailsComponent implements OnDestroy {
  @Output() close = new EventEmitter();
  constructor(private reportService: ReportService) {}
  onClose() {
    this.close.emit();
  }
  get selectedReport() {
    return this.reportService.selectedReport;
  }
  ngOnDestroy(): void {
    this.reportService.clearSelectedReport();
  }
}
