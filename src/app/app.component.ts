import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog,  MatDialogConfig  } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { Loan } from './models/loan';
import { LoanService } from './services/loan.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loans!: Loan[];
  loan!: Loan;
  subscription!: any;

  totalAmount = 0;
  invested: string[] = []
  selected!: string;
  
  constructor(
    public dialog: MatDialog,
    private loanService: LoanService) {}

  ngOnInit() {
    this.subscription = this.loanService.getJSONData()
    .subscribe(data => {
      this.loans = data.loans;
      this.loans.map((loan: any) => {
        this.totalAmount += this.loanService.convertStringToNumber(loan.amount);
      })
    });
  }
  
  showDialog(index: number): void {
    const dialogData = new MatDialogConfig();

    dialogData.data = {
      title: this.loans[index].title,
      available: this.loanService.convertStringToNumber(this.loans[index].available),
      term_remaining: this.loans[index].term_remaining,
    }
    
    const dialogRef = this.dialog.open(DialogComponent, dialogData);
    dialogRef.updateSize('627px','499px')

    dialogRef.afterClosed().subscribe((data) => {
      this.calculations(data, index)
    });
  }

  calculations(data: any, index: number) {
      if (data) {
        const available = this.loanService.convertStringToNumber(this.loans[index].available);
        const amount = this.loanService.convertStringToNumber(this.loans[index].available);

        this.loans[index].available = this.loanService.convertNumberToStringFormat(available, data.form.investedAmount);
        this.loans[index].amount = this.loanService.convertNumberToStringFormat(amount, data.form.investedAmount);

        this.selected = this.loans[index].id
        this.invested.push(this.loans[index].id)
        
        this.totalAmount -= data.form.investedAmount; 
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
