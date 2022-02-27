import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { cartAllCount } from '@store/selector/product.selectors';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';

@Component({
  selector: 'app-primary-nav',
  templateUrl: './primary-nav.component.html',
  styleUrls: ['./primary-nav.component.scss']
})
export class PrimaryNavComponent implements OnInit {
  count: number = 0;

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.select(cartAllCount).subscribe(c => this.count = c);
  }

  openCart() {
    this.dialog.open(CartSummaryComponent, {
      width: '400px',
      height: '100%'
    }).updatePosition({ right: '0' });
  }

}
