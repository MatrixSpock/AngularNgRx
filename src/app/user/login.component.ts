import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../state/app.state';


import { AuthService } from './auth.service';
import { getMaskUserName } from './state/login.reducer';
import * as LoginActions from './state/actions/login-page.actions'
import { Observable } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';

  // maskUserName: boolean;
  maskUserName$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router, private store: Store<State>) { }

  ngOnInit(): void {
    this.maskUserName$ = this.store.select(getMaskUserName);
    // this.store.select(getMaskUserName).subscribe(
    //   maskUserName => this.maskUserName = maskUserName
    // )
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    // this.maskUserName = !this.maskUserName;
    // this.store.dispatch({
    //   type: '[User] Mask User Name'
    // })
    this.store.dispatch(LoginActions.maskUserName());
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
