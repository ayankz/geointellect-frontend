import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';

const mapRoutes: Routes = [{ path: '', component: MapComponent }];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(mapRoutes),
    CommonModule,
    SharedModule,
    HttpClientModule,
    MatTooltipModule,
  ],
})
export class MapModule {}
