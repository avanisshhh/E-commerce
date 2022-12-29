import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, signUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private route: Router) { }
  userSignUp(data: signUp) {

    this.http.post<signUp>('http://localhost:3000/users', data, { observe: 'response' }).subscribe((result) => {
      console.warn(result);
      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body))
        this.route.navigate(['/']);
      }

    })

  }
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.route.navigate(['/'])
    }
  }
  userLogin(data: login) {
    this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((result) => {
        if (result && result.body) {
          console.warn(result);
          localStorage.setItem('user',JSON.stringify(result.body[0]))
          this.route.navigate(['/']);

        }
      })
  }
}
