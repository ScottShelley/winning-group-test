import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/effects/product.effects';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/state/product.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { AppComponent } from './app.component';
import { PrimaryNavComponent } from '@components/primary-nav/primary-nav.component';
import { FooterComponent } from '@components/footer/footer.component';
import { CartSummaryComponent } from '@components/cart-summary/cart-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    PrimaryNavComponent,
    FooterComponent,
    CartSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatDialogModule,
    MatDividerModule,
    MatCardModule,
    MatButtonToggleModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([ProductEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
