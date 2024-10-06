import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RemoveModalComponent } from './components/remove-modal/remove-modal.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  @ViewChild('compareBtn') compareBtn!: ElementRef;
  @ViewChild('downloadBtn') downloadBtn!: ElementRef;
  constructor(private dialog: MatDialog) {}
  public isAbilityToSelect = false;
  public showDetails = false;
  public selectedReports: any[] = [];
  public reports: any[] = [
    {
      address: 'Астана, Ельский р-н, ул. Бостандыкова 132',
      date: '21 дек. 2024',
      imageName: 'assets/images/report_1.png',
      isSelected: false,
    },
    {
      address: 'Астана, Ельский р-н, ул. Бостандыкова 132',
      date: '21 дек. 2024',
      imageName: 'assets/images/report_1.png',
      isSelected: false,
    },
    {
      address: 'Астана, Ельский р-н, ул. Бостандыкова 132',
      date: '21 дек. 2024',
      imageName: 'assets/images/report_1.png',
      isSelected: false,
    },
    {
      address: 'Астана, Ельский р-н, ул. Бостандыкова 132',
      date: '21 дек. 2024',
      imageName: 'assets/images/report_1.png',
      isSelected: false,
    },
  ];
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
