import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const domain = 'https://www.wiredmates.com/api/';

export class User {
  cards: any[];
  contacts: any[];
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  level: number;
  middleName: string;
  notifications: any[];
  occupation: string;
  organization: string;
  phone: string;
  photo: string;
  settings: any;
  type: string;
  verified: number;
  address1: string;

  constructor (user) {
    user = user || {};

    this.cards = user.cards || [];
    this.contacts = user.contacts || [];
    this.email = user.email || '';
    this.firstName = user.firstName || '';
    this.id = user.id || null;
    this.lastName = user.lastName || '';
    this.level = user.level || null;
    this.middleName = user.middleName || '';
    this.notifications = user.notifications || [];
    this.occupation = user.occupation || '';
    this.organization = user.organization || '';
    this.phone = user.phone || '';
    this.photo = user.photo || '';
    this.settings = user.settings || {};
    this.type = user.type || '';
    this.verified = user.verified || null;
    this.address1 = user.address1 || '';
  }
}

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public token: string;
  public user: User;

  constructor (public http: HttpClient) {
    console.log('Hello AuthProvider Provider');

    this.loadUserData();
  }

  signIn (user) {
    return this.http.post(domain, user);
  }

  signUp (user) {
    return this.http.post(domain, user);
  }

  loadUserData () {
    this.token = localStorage.getItem('token');
    this.user = new User(JSON.parse(localStorage.getItem('user')));

    console.info(this.user, this.token);
  }

  storeUserData (token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = new User(user);
  }

  verify (code) {
    return this.http.post(domain, code);
  }

  resendVerificationCode (code) {
    return this.http.post(domain, code);
  }

  registerUserType (type) {
    return this.http.post(domain, type);
  }

  deleteAccount (user) {
    return this.http.post(domain, user);
  }
}
