import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData:cart[]|undefined
  orderMsg:string|undefined;
  constructor(private product: ProductService, private router: Router) { }
  ngOnInit(): void {
    this.product.currentCart().subscribe((res) => {
     this.cartData=res;
      let price = 0;
      res.forEach((item) => {
        if (item.quantity)
          price = price + (+item.price * +item.quantity);
      });
      this.totalPrice = price + price / 10 - price / 10 + 100;


      console.warn(this.totalPrice);


    })
  }

  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined,

      }
      //remove data from cart on checkout
      this.cartData?.forEach((item)=>{
       setTimeout(()=>{
        item.id && this.product.deleteCartItems(item.id)
       },600)

      })
      this.product.orderNow(orderData).subscribe((res) => {
        if(res) {
          this.orderMsg="Your order has been placed";
           alert('Order placed');

          setTimeout(() => {
            this.router.navigate(['/my-orders']);
            this.orderMsg=undefined;
            
          }, 4000);
        }

      })
    }


  }
}
