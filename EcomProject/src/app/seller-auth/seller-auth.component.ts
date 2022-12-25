import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { signUp } from '../data-type';
//
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  router: any;
  authError:string='';
  showLogin = false;
  constructor(private seller: SellerService) {}
  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data: signUp): void {
    //console.warn(data);
    this.seller.userSignUp(data);
  }
  Login(data: signUp): void {
    this.authError='';
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or Password is not correct";

      }
    })
  }
  openLogin() {
    this.showLogin = false;
  }
  openSignUp() {
    this.showLogin = true;
  }
}
