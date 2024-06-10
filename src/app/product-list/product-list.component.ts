import { Component, DoCheck } from '@angular/core';
import { ApiService, IProduct } from '../services/api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  public products: IProduct[] = [];
  constructor(public api: ApiService, private castService: CartService) { }

  ngOnInit() {
  }

  addToCart(product: IProduct){
    this.castService.addProductSignal(product);
  }
  decrease(product: IProduct){
    this.castService.reduceProductSignal(product)
  }
}
