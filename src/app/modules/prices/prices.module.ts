import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PricesComponent} from "./prices.component";
import {PricesDetailComponent} from "./prices-detail/prices-detail.component";
import {ActivePackageInfoComponent} from "../../components/active-package-info/active-package-info.component";
import {SharedModule} from "../shared/shared.module";
const pricesRoutes: Routes = [
  {path: '', component: PricesComponent},
  {path: ':type', component: PricesDetailComponent},
];


@NgModule({
  declarations: [PricesComponent,PricesDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(pricesRoutes),
    ActivePackageInfoComponent,
    SharedModule,
  ]
})
export class PricesModule { }
