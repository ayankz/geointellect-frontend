import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {MapComponent} from "./components/map/map.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {HintComponent} from "./components/hint/hint.component";

const routes: Routes = [
  {path: '', redirectTo: 'map', pathMatch:'full'},
  {path: 'map', component: MapComponent},
  {path: 'reports', loadChildren : () =>
      import('./modules/reports/reports.module')
        .then((m) => m.ReportsModule)},
  {path: 'prices', loadChildren : () =>
      import('./modules/prices/prices.module')
        .then((m) => m.PricesModule)},
];

@NgModule({
    declarations: [AppComponent, NavbarComponent, MapComponent,HintComponent],
    imports: [
        BrowserModule,
        CommonModule,
        RouterModule.forRoot(routes),
        NgOptimizedImage,
    ],
    bootstrap: [AppComponent],
    exports: [
      RouterModule,
        NavbarComponent,
      HintComponent
    ]
})
export class AppModule { }
