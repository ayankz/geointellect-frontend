import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PricesComponent} from "../prices/prices.component";
import {AccountInfoComponent} from "./components/account-info/account-info.component";
import {ActivePackageInfoComponent} from "../../components/active-package-info/active-package-info.component";
import {SharedModule} from "../shared/shared.module";

const accountRoutes: Routes = [
  {path: '', component: AccountInfoComponent},
];

@NgModule({
  declarations: [AccountInfoComponent],
    imports: [
        RouterModule.forChild(accountRoutes),
        CommonModule,
        ActivePackageInfoComponent,
        SharedModule
    ]
})
export class AccountModule { }
