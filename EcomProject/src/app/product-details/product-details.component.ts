import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart=false;

  constructor(
    private activateRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('id');
   
    //console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        //console.warn(result);
        this.productData = result;

        let cartData=localStorage.getItem('localCart');
        if(productId && cartData){
          let items=JSON.parse(cartData);
          items=items.filter((item:product)=>productId==item.id.toString())
          if(items.length){
            this.removeCart=true;
          }else{
            this.removeCart=false;
          }
        }
      });
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  addToCart() {
  
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('users')) {
        console.warn(this.productData);
        this.product.localAddToCart(this.productData);
        this.removeCart=true;
      } 
      // else {
      //   console.warn('Else');
      // }
    }
  }
  removeToCart(productId:number){
    this.product.removeItemFromCart(productId);
    this.removeCart=false;

  }
}
