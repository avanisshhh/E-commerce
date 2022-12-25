import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product;
  productMessage:undefined|string;
  constructor(private route: ActivatedRoute, private product: ProductService) {}
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id'); //imp
    //console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        //console.warn(data);
        this.productData = data;
      });
  }

  submit(data: product) {
    if(this.productData){
      data.id=this.productData.id;
    }
    //console.warn(data,"aaaaaaaaaaaaaaaa");
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage="Product Updated successfully.."
      }

    })
    setTimeout(()=>{
      this.productMessage=undefined;

    },2000)
    
  }
}
