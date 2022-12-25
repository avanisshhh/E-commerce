import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchProduct: undefined | product[];
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    //query is the same name we get in route  after "/"
    let query = this.activeRoute.snapshot.paramMap.get('query');
    // activeRoute.snapshot.paramMap.get used to get data from search event
    console.warn(query, 'active route');
    query &&
      this.product.searchProducts(query).subscribe((result) => {
        this.searchProduct = result;
      });
  }
}
