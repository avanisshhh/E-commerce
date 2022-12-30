import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData=new EventEmitter<product[]|[]>();
  constructor(private http: HttpClient) {}
  addProduct(data: product) {
    //console.warn('service called');
    return this.http.post('http://localhost:3000/products', data);
  }
  productList() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put<product>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }

  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }
  trendyProduct() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }
  searchProducts(query: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }

  localAddToCart(data:product){
     let cartData=[];
     let localCart=localStorage.getItem('localCart');
     if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
     }
     else{ 
      //if some data is already present in local storage than this call happend and here
      cartData=JSON.parse(localCart);   //first parse data to js 
      cartData.push(data);     //push/pass all te data to array
      localStorage.setItem('localCart',JSON.stringify(cartData)); //again setting all data to local storage

      this.cartData.emit(cartData);
     }
     
  }
  removeItemFromCart(productId:number){
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      let items:product[]=JSON.parse(cartData);
      items=items.filter((item:product) =>productId!==item.id)
      console.warn(items,"31dec");
      localStorage.setItem('localCart',JSON.stringify(items)); 
      this.cartData.emit(items);

    }
  }
}

