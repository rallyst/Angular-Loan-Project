import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    MatToolbarModule
  ],
  exports: [
    MatDialogModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
