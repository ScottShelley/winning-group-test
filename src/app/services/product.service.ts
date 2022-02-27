import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@store/models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>('/assets/MOCK_DATA.json')
  }
}
