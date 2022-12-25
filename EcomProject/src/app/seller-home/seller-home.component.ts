import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  productMessage: undefined | string;
  deleteIcon=faTrash;
  editIcon=faEdit;
  constructor(private product: ProductService) {}
  ngOnInit(): void {
    this.list();
   
    //throw new Error('Method not implemented.');
  }

  deleteProduct(id: number) {
    //console.warn('test id :', id);
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'product deleted';
      }
      this.list();
    });
    setTimeout(()=>{
      this.productMessage='';
    },2000)
  }

  list(){
    this.product.productList().subscribe((result) => {
      //console.warn(result);
      this.productList = result;
    });
  }
}
