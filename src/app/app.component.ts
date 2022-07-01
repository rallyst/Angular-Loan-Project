import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog,  MatDialogConfig  } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { Loan } from './models/loan';
// import loansJSON from './current-loans.json';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
// import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'LOAN-Project';
  loans!: Loan[];

  subscription!: any;


  totalAmount: any = 238456;
  // loans$ = new Observable<Loan[]>();

  // _contactsSubject: Subject<any> = new Subject<any>();

  newAdd: Loan = {
    id: '3',
    title: 'amy'
  }

  private jsonURL = './assets/current-loans.json';
  constructor(
    public dialog: MatDialog,
    private http: HttpClient) {}

    public getJSONData(): Observable<any> {
      return this.http.get(this.jsonURL)
    }


    add() {
      console.log('click')
    }

  ngOnInit() {
    // this.loans$ = this.getJSONData()
    this.subscription = this.getJSONData()
      .subscribe(data => {
        this.loans = data.loans;
      });

      // console.log(this.loans)
  }


  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  dataFromDialog : any;

  showPrompt(index: any): void {
    console.log(index)

    const dialogData = new MatDialogConfig();

    dialogData.data = {
      title: this.loans[index].title,
      available: this.loans[index].available,
      term_remaining: this.loans[index].term_remaining,
    }
    
     const dialogRef = this.dialog.open(DialogComponent, dialogData);
 
     dialogRef.afterClosed().subscribe((data) => {
       this.dataFromDialog = data.form.investedAmount;
       if (data.clicked === 'submit') {
         console.log('Sumbit button clicked')
         console.log(this.dataFromDialog)
       }
     });
   }
}

