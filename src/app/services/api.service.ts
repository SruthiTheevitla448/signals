import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public products = toSignal<IProduct[]>(this.http.get<IProduct[]>('https://fakestoreapi.com/products'));
  constructor( private http: HttpClient) { }
  
}
export interface IProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: IRating;
  quantity:number,
  totalPrice:number
}

interface IRating {
  rate: number;
  count: number;
}


