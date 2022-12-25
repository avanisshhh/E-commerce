import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchResult: undefined | product[];
  constructor(private route: Router, private product: ProductService) {}
  menuType = 'default';
  sellerName = '';
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        console.warn(val.url);
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          //console.warn('in seller area');
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0]; //convert json string to json object
            this.sellerName = sellerData.name;
          }
        } else {
          //console.warn('outside seller');
          this.menuType = 'default';
        }
      }
    });
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement; //

      this.product.searchProducts(element.value).subscribe((result) => {
        //console.warn(result, 'search result');
        this.searchResult = result;
        if (result.length > 5) {
          result.length = 5;
        }
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val: string) {
    console.warn(val);
    this.route.navigate([`search/${val}`]);
  }
  redirectToDetails(id: number) {
    this.route.navigate([`/details/${id}`]);
  }
}
