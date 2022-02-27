import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TEST_DATA } from '@services/product.service.spec';
import { productList, productLoading } from '@store/selector/product.selectors';

import { ProductListingComponent } from './product-listing.component';
import { ProductModelComponent } from './product-model/product-model.component';

describe('ProductListingComponent', () => {
  let component: ProductListingComponent;
  let fixture: ComponentFixture<ProductListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProductListingComponent,
        ProductModelComponent
      ],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatIconModule,
        MatProgressBarModule
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: productList,
              value: TEST_DATA
            },
          ],
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be displaying a grid of products', () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const img = fixture.debugElement.query(By.css('img.img'));
      const name = fixture.debugElement.query(By.css('mat-card-subtitle'));

      expect(img).toBeTruthy();
      expect(name).toBeTruthy();
    });
  });

  it('should be showing progress bar', () => {
    const mockStore = TestBed.inject(MockStore);
    const mockHomeState = mockStore.overrideSelector(
      productLoading,
      true
    );
    mockStore.refreshState();

    fixture = TestBed.createComponent(ProductListingComponent);
    fixture.detectChanges();
    
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const progressBar = fixture.debugElement.query(By.css('mat-progress-bar'));

      expect(progressBar).toBeTruthy();
    });
  });

  it('should call setBreakpoint', () => {
    const spy = spyOn(component, 'setBreakpoint');
    component.onResize()
    expect(spy).toHaveBeenCalledWith(785);
  });

  it('should set breakpoint', () => {
    component.setBreakpoint(720)
    expect(component.breakpoint).toBe(1);

    component.setBreakpoint(960)
    expect(component.breakpoint).toBe(2);

    component.setBreakpoint(1140)
    expect(component.breakpoint).toBe(3);

    component.setBreakpoint(1141)
    expect(component.breakpoint).toBe(4);
  });

  it('should open ProductModelComponent dialog', () => {
    const spy = spyOn(TestBed.inject(MatDialog), 'open');

    component.addToCart(TEST_DATA[0]);

    expect(spy).toHaveBeenCalledWith(ProductModelComponent, { data: TEST_DATA[0] });
  });
});
