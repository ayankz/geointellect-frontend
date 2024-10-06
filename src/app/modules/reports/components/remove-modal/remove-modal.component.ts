import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-modal',
  standalone: true,
  imports: [],
  templateUrl: './remove-modal.component.html',
  styleUrl: './remove-modal.component.scss',
})
export class RemoveModalComponent {
  constructor(
    public dialogRef: MatDialogRef<RemoveModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onClose() {
    this.dialogRef.close();
  }
}
