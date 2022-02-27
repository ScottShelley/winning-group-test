import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { ProductService } from './product.service';
import { Product } from '../store/models/product.model';

export const TEST_DATA = [{sku:"671695659-X",name:"Veal Inside - Provimi",price:166,rrp:223,image:"http://dummyimage.com/300x300.png/ff4444/ffffff"},{sku:"740799661-X",name:"Milk - Condensed",price:165,rrp:220,image:"http://dummyimage.com/300x300.png/cc0000/ffffff"},{sku:"296764728-4",name:"Juice - Ocean Spray Kiwi",price:131,rrp:222,image:"http://dummyimage.com/300x300.png/dddddd/000000"},{sku:"910412149-X",name:"Island Oasis - Banana Daiquiri",price:160,rrp:232,image:"http://dummyimage.com/300x300.png/dddddd/000000"}];

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ], providers: [
        ProductService
      ]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to get product list', () => {
    // mock data
    const mockData: Product[] = TEST_DATA;

    // actual call
    service.getProductList().subscribe(data => {
      expect(data).toEqual(mockData)
    });

    // mocking http
    const req = httpTestingController.expectOne('/assets/MOCK_DATA.json');
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);

    // verify http
    httpTestingController.verify();
  });
});
