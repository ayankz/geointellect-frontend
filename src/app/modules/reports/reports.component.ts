import {
  Component,
  ElementRef,
  signal,
  TemplateRef,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RemoveModalComponent } from './components/remove-modal/remove-modal.component';
import { ReportService } from '../../services/report.service';
import { Report } from '../../types/report';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  @ViewChild('compareBtn') compareBtn!: ElementRef;
  @ViewChild('downloadBtn') downloadBtn!: ElementRef;
  public isAbilityToSelect = false;
  public showDetails = false;
  public selectedReports: any[] = [];
  public reports: any[] = [];
  constructor(
    private dialog: MatDialog,
    private reportService: ReportService
  ) {
    this.reportService.reports.subscribe(reports => (this.reports = reports));
  }
  openReportDetail(report: Report) {
    this.reportService.setSelectedReport(report);
    this.showDetails = true;
  }
  openModal() {
    this.dialog
      .open(RemoveModalComponent, {
        disableClose: true,
        panelClass: 'customDialog',
        width: '480px',
        height: 'auto',
        data: {},
      })
      .afterClosed()
      .subscribe();
  }
  onChange() {
    this.isAbilityToSelect = !this.isAbilityToSelect;
    this.reports?.map(el => (el.isSelected = false));
    this.selectedReports = [];
  }
  setActive(report: any) {
    report.isSelected = !report.isSelected;
    this.selectedReports = [
      ...this.reports.filter(report => report.isSelected),
    ];
    const styles: any = {
      background: '#FFFFFF',
      color: '#1A1E27',
      border: '1px solid #C4CAD4',
    };
    if (this.selectedReports.length === 2) {
      this.compareBtn.nativeElement.setAttribute(
        'style',
        'background: #3f80ff'
      );
      this.downloadBtn.nativeElement.style.flexBasis = '50%';
      for (const key in styles) {
        if (styles.hasOwnProperty(key)) {
          this.downloadBtn.nativeElement.style[key] = styles[key];
        }
      }
    }
    if (this.selectedReports.length === 3) {
      this.compareBtn.nativeElement.setAttribute('style', 'display: none');
      this.downloadBtn.nativeElement.style.flexBasis = '100%';
    }
  }
}
