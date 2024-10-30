import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReportDetailsComponent } from './components/report-details/report-details.component';
import { ReportCompareComponent } from './components/report-compare/report-compare.component';

const reportsRoutes: Routes = [{ path: '', component: ReportsComponent }];

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(reportsRoutes),
    SharedModule,
    ReportDetailsComponent,
    ReportCompareComponent,
  ],
})
export class ReportsModule {}
