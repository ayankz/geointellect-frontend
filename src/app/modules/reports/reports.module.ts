import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReportsComponent} from "./reports.component";
import {RouterModule, Routes} from "@angular/router";

const reportsRoutes: Routes = [
  {path: '', component: ReportsComponent},
];

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(reportsRoutes),
  ]
})
export class ReportsModule { }
