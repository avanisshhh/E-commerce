import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  constructor(private product: ProductService) { }
  ngOnInit(): void {
    this.product.currentCart().subscribe((res) => {

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

      }
      this.product.orderNow(orderData).subscribe((res) => {
        alert('Order placed')
      })
    }


  }
}
