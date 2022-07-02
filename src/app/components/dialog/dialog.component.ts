import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  data!: any;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { message: string }) { 
      this.data = data;
      this.form = this.fb.group({
        investedAmount: ['', Validators.required],  
      });
    }

  ngOnInit(): void {}

  submit(form: NgForm) {
    this.dialogRef.close({
      form: form
    });
  }
  
  close() {
    this.dialogRef.close(false)
  }
}
