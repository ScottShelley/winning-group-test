import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListingRoutingModule } from './product-listing-routing.module';
import { ProductListingComponent } from './product-listing.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductModelComponent } from './product-model/product-model.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    ProductListingComponent,
    ProductModelComponent
  ],
  imports: [
    CommonModule,
    ProductListingRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressBarModule
  ]
})
export class ProductListingModule { }
