import { TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { CartSummaryComponent } from '@components/cart-summary/cart-summary.component';
import { FooterComponent } from '@components/footer/footer.component';
import { PrimaryNavComponent } from '@components/primary-nav/primary-nav.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatIconModule
      ],
      declarations: [
        AppComponent,
        PrimaryNavComponent,
        FooterComponent,
        CartSummaryComponent
      ],
      providers: [
        provideMockStore(),
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
