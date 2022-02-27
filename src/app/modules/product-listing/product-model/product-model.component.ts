import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CartSummaryComponent } from 'src/app/components/cart-summary/cart-summary.component';
import { AddToCart, MisusCart, RemoveCart } from '@store/actions/product.actions';
import { Product } from '@store/models/product.model';
import { cartCount } from '@store/selector/product.selectors';

@Component({
  selector: 'app-product-model',
  templateUrl: './product-model.component.html',
  styleUrls: ['./product-model.component.scss']
})
export class ProductModelComponent implements OnInit {
  count$ = this.store.select(cartCount(this.product));

  constructor(
    private dialogRef: MatDialogRef<ProductModelComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private dialog: MatDialog,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  openCart() {
    this.dialog.open(CartSummaryComponent, {
      width: '400px',
      height: '100%'
    }).updatePosition({ right: '0' });
  }

  plus() {
    this.store.dispatch(new AddToCart(this.product));
  }

  minus() {
    this.store.dispatch(new MisusCart(this.product));
  }

  remove() {
    this.store.dispatch(new RemoveCart(this.product));
  }

}
