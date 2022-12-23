import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(data: signUp) {
  
    this.http
      .post<any>('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        console.warn('result', result);
        if (result) {
          //this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
          //redirect the value when data came
        }

        
      });
  }
  
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userLogin(data: login) {
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length===1) {
          console.warn('user logged in');
          localStorage.setItem('seller',JSON.stringify(result.body));
          this.isSellerLoggedIn.next(true);
          this.router.navigate(['seller-home']);
        } else {
          console.warn('login failed');
          this.isLoginError.emit(true);
        }
      });
  }
}
