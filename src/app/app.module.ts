import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { MapComponent } from './modules/map/components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HintComponent } from './components/hint/hint.component';
import { SharedModule } from './modules/shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTooltip } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  {
    path: 'map',
    loadChildren: () =>
      import('./modules/map/map.module').then(m => m.MapModule),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./modules/reports/reports.module').then(m => m.ReportsModule),
  },
  {
    path: 'prices',
    loadChildren: () =>
      import('./modules/prices/prices.module').then(m => m.PricesModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./modules/account/account.module').then(m => m.AccountModule),
  },
  {
    path: 'info',
    loadChildren: () =>
      import('./modules/info/info.module').then(m => m.InfoModule),
  },
];

@NgModule({
  declarations: [AppComponent, MapComponent, HintComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    NgOptimizedImage,
    SharedModule,
    MatTooltip,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule, HintComponent],
  providers: [provideAnimationsAsync()],
})
export class AppModule {}
