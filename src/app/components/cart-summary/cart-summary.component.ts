import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AddToCart, ClearCart, MisusCart, RemoveCart } from '@store/actions/product.actions';
import { Product } from '@store/models/product.model';
import { cartList, totalPrice } from '@store/selector/product.selectors';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {
  cartList$ = this.store.select(cartList);
  totalPrice$ = this.store.select(totalPrice);

  constructor(
    private dialogRef: MatDialogRef<CartSummaryComponent>,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  plus(product: Product) {
    this.store.dispatch(new AddToCart(product));
  }

  minus(product: Product) {
    this.store.dispatch(new MisusCart(product));
  }

  remove(product: Product) {
    this.store.dispatch(new RemoveCart(product));
  }

  clearCart() {
    this.store.dispatch(new ClearCart());
  }
}
