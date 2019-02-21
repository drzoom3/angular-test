import {
  Component,
  Inject
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';

export interface Seat {
  row: number,
  seat: number,
  price: number,
  busy: boolean,
  selected: boolean
}

export interface DialogData {
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})

export class AppComponent  {
  constructor(public alert: MatDialog) {

  }

  COLS = 10;
  ROWS = 10;
  total = 0;
  seats: Seat[] = [];
  selectedText: string = 'нет';

  ngOnInit() {
    this.fetchSeats();
  };

  onSelectSeat(item: Seat): void {
    console.log('onSelectSeat')

    item.selected = !item.selected;

    this.updateTotals();
  };

  onCancelSelectedSeats(): void {
    console.log('onCancelSelected')
    this.seats.map( el => {
      el.selected = false
    })

    this.updateTotals();
  };

  onDoneSelectedSeats(): void {
    console.log('onDoneSelected')
    const selected = this.seats.filter( el => el.selected);

    const dialogRef = this.alert.open(AlertDialog, {
      width: '200px',
      data: {
        text: selected.length ? 'Спасибо за заказ!' : 'Нет выбранных мест'
      }
    });

    this.seats.map( el => {
      if (el.selected) {
        el.busy = true;
        el.selected = false;
      }
    });

    this.updateTotals();

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };

  updateTotals(): void {
    const text = [];
    let total = 0;
  
    this.seats.map( el => {
      if (el.selected) {
        text.push(`ряд ${el.row} место ${el.seat}`);
        total += el.price;
      }
    });
  
    this.total = total;
    this.selectedText = text.length > 0 ? text.join(', ') : 'нет';
  }

  range(n: number) {
    return Array.from(new Array(n), (val,i) => i+1);
  }

  fetchSeats = () => {
    const seats = [];
    const busySeats = []
    const totalSeats = this.COLS * this.ROWS;
    const prices = [10,20,50,75,100];

    const getRandomSeat = () => {
      const random = Math.floor(Math.random() * totalSeats);

      if (busySeats.indexOf(random) < 0) {
        return random;
      } else {
        return getRandomSeat();
      }
    }

    for (let i = 0; i < 10; i++) {
      const random = getRandomSeat();
      
      busySeats.push(random);
    }

    let index = 0;

    for ( let i = 1; i <= this.ROWS; i++ ) {
      for ( let j = 1; j <= this.COLS; j++ ) {
        
        seats.push({
          row: i,
          seat: j,
          price: prices[Math.floor(Math.random() * prices.length)],
          busy: busySeats.indexOf(index) >= 0,
          selected: false
        });

        index++;
      }
    }

    this.seats = seats;
  }
};

@Component({
  selector: 'alert-dialog',
  template: `<mat-dialog-content align="center">{{ data.text }}</mat-dialog-content>
    <mat-dialog-actions align="center">
      <button mat-flat-button color="primary" mat-dialog-close>Закрыть</button>
    </mat-dialog-actions>`
})

export class AlertDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {    
  };
};
