import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { SharedModule } from '../../shared/shared.module'


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  data!: any;

  ngOnInit(): void {
  }

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: { message: string },
    public dialogRef: MatDialogRef<DialogComponent>
  ) { 
    this.data = data;
    console.log(this.data)
    this.form = this.fb.group({
      investedAmount: ['', Validators.required],
      
    });
  }


  submit(form: NgForm) {
    this.dialogRef.close({
      clicked: 'submit',
      form: form
    });
  }
  
}
