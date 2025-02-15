import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ExpandedCardComponent } from '../../components/expanded-card/expanded-card.component';
import {
  MatAccordion,
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [NavbarComponent, ExpandedCardComponent],
  exports: [NavbarComponent, ExpandedCardComponent],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
})
export class SharedModule {}
