import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AddToCart, LoadProducts } from '@store/actions/product.actions';
import { Product } from '@store/models/product.model';
import { productList, productLoading } from '@store/selector/product.selectors';
import { ProductModelComponent } from './product-model/product-model.component';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {
  breakpoint: number = 2;
  loading$ = this.store.select(productLoading);
  productList$ = this.store.select(productList);

  constructor(
    private store: Store,
    private title: Title,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Product Listing | Winning Group Test');
    this.setBreakpoint(window.innerWidth);
    this.store.dispatch(new LoadProducts());
  }

  @HostListener('window:resize', [])
  onResize() {
    this.setBreakpoint(window.innerWidth);
  }

  setBreakpoint(screenWidth: number) {
    this.breakpoint = (screenWidth <= 720) ? 1 : (screenWidth <= 960) ? 2 : (screenWidth <= 1140) ? 3 : 4;
  }

  addToCart(product: Product) {
    this.store.dispatch(new AddToCart(product));
    this.dialog.open(ProductModelComponent, {
      data: product
    })
  }
}
