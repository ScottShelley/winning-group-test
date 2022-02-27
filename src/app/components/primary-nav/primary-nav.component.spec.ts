import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { cartAllCount } from '@store/selector/product.selectors';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';

import { PrimaryNavComponent } from './primary-nav.component';


describe('PrimaryNavComponent', () => {
  let component: PrimaryNavComponent;
  let fixture: ComponentFixture<PrimaryNavComponent>;

  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: 
     null, updatePosition: () => {} });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryNavComponent ],
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatIconModule,
        MatBadgeModule
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: cartAllCount,
              value: 1
            },
          ],
        })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open CartSummaryComponent dialog', () => {
    const spy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);

    component.openCart();

    expect(spy).toHaveBeenCalledWith(CartSummaryComponent, { width: '400px', height: '100%' });
  });
});
