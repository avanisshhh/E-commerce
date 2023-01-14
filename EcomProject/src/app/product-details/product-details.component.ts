import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined

  constructor(
    private activateRoute: ActivatedRoute,
    private product: ProductService
  ) { }
  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');

    //console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        //console.warn(result);
        this.productData = result;

        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter((item: product) => productId == item.id.toString())
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
        let user = localStorage.getItem('user');
        //this call we are adding bcs on page refreshing the cart data is gone and not updating according to data in db
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
          this.product.cartData.subscribe((result) => {
            let item = result.filter((item: product) => productId == item.productId?.toString())
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            }
          })
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
      if (!localStorage.getItem('user')) {
        //console.warn(this.productData);
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      }
      else {
        console.warn('User is logged in');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        console.warn(userId, 'log');
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        }
        delete cartData.id;
        console.warn(cartData);
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            //console.log('Product added to Cart', userId);
            this.product.getCartList(userId);
            this.removeCart = true;
          }

        })


      }
    }
  }
  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {    //when user is not logged in remove work from it
      this.product.removeItemFromCart(productId);
    }
    else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.cartData && this.product.removeToCart(this.cartData?.id).subscribe((result) => {
        if (result) {
          this.product.getCartList(userId);
        }
      })
      console.warn(this.cartData);

    }
    this.removeCart = false;
  }
}
