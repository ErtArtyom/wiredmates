import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { RequestData } from '../../models/request-data';
import { AlertController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Message } from '../../models/message';
import { Notify } from '../../models/notify';

const domain = 'https://www.wiredmates.com/api/';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  private tokenExpired: Subject<any> = new Subject<any>();

  get token (): string {
    return this._token;
  }

  set token (value: string) {
    this._token = value;
    if (value) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }
  }

  private _token: string;
  public user: User;

  constructor (public http: Http,
               private alertCtrl: AlertController,
               private toast: ToastController) {
    console.log('Hello AuthProvider Provider');

    this.loadUserData();
  }

  /**
   * Sign in user
   * @param user
   * @returns {Observable<RequestData | any>}
   */
  public signIn (user: any): Observable<RequestData | any> {
    user.action = 'login';
    return this.postRequest(user);
  }

  /**
   * Sign up user
   * @param user
   * @returns {Observable<RequestData | any>}
   */
  public signUp (user: any): Observable<RequestData | any> {
    user.action = 'register';
    return this.postRequest(user);
  }

  /**
   * Get user data and token from local storage
   */
  public loadUserData (): void {
    this.token = localStorage.getItem('token'); // get token from local storage
    let user = localStorage.getItem('user'); // get user data from local storage
    console.log(user);
    if (user) {
      this.user = new User(JSON.parse(user)); // parse and set user
    }
  }

  /**
   * Store user data and token from backend
   * @param {string} token
   * @param {User} user
   */
  public storeUserData (token: string = undefined, user: User = undefined): void {
    this.token = token;
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.user = new User(user);
    }
  }

  /**
   * Verify registration code
   * @param code
   * @returns {Observable<RequestData | any>}
   */
  public verify (code: any): Observable<RequestData | any> {
    code.action = 'verification';
    return this.postRequest(code);
  }

  /**
   * Re send verification code
   * @param email
   * @returns {Observable<RequestData | any>}
   */
  public resendVerificationCode (email: string): Observable<RequestData | any> {
    return this.postRequest({
      action: 'resendVerificationCode',
      email: email
    });
  }

  /**
   * Register user type
   * @param type
   * @returns {Observable<RequestData | any>}
   */
  public registerUserType (type: any): Observable<RequestData | any> {
    return this.postRequest({
      action: 'registerUserType',
      email: type.email,
      type: type.type,
      organization: type.organization,
      occupation: type.occupation,
      agree: type.agree,
    });
  }

  public deleteAccount (user) {
    return this.http.post(domain, user);
  }

  public saveContactDetails (user) {
    return this.http.post(domain, user);
  }

  /**
   * Get mates by search query
   * @param {string} searchQuery
   * @returns {Observable<RequestData | any>}
   */
  public getMates (searchQuery: string): Observable<RequestData | any> {
    return this.postRequest({
      action: 'findMate',
      key: searchQuery,
      token: this.token
    });
  }

  /**
   * Add mate by id
   * @param {number} id
   * @returns {Observable<RequestData | any>}
   */
  public addMate (id: number): Observable<RequestData | any> {
    return this.postRequest({
      action: 'addMate',
      id: id,
      token: this.token
    });
  }

  /**
   * Get My Messages
   * @param {number} id
   * @param {number} roomKey
   * @returns {Observable<RequestData | any>}
   */
  public getMessages (id: number = null, roomKey: string = null): Observable<RequestData | any> {
    return this.postRequest({
      action: 'getMyMessages',
      id: id,
      roomKey: roomKey,
      token: this.token
    });
  }

  /**
   * Send Message
   * @param message
   * @returns {Observable<RequestData | any>}
   */
  public sendMessage (message: Message): Observable<RequestData | any> {
    return this.postRequest({
      action: 'sendMessage',
      receiverID: message.receiverID,
      message: message.message,
      token: this.token
    });
  }

  /**
   * Get my notifications
   * @param notify
   * @returns {Observable<RequestData | any>}
   */
  public getNotifications (notify: any): Observable<RequestData | any> {
    return this.postRequest({
      action: 'getMyNotifications',
      id: notify.id,
      token: this.token
    });
  }

  /**
   * On token expired
   * @returns {Observable<any>}
   */
  public onRoot (): Observable<any> {
    return this.tokenExpired.asObservable();
  }

  /**
   * Post request by data
   * @param data
   * @returns {Observable<RequestData | any>}
   */
  private postRequest (data: any): Observable<RequestData | any> {
    let headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
    let options = new RequestOptions({headers: headers}); // Create a request option

    return this.http.post(domain, data, options) // ...using put request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .map((res: RequestData) => { // checking if has error
        if (res.e) {
          if (res.e === 13) {
            this.toast.create({
              message: res.d,
              duration: 3000,
              position: 'top'
            }).present();

            this.storeUserData();

            this.tokenExpired.next('LoginPage');
          } else {
            this.alertCtrl.create({ // showing error alert
              title: 'Error',
              subTitle: res.d,
              buttons: ['Ok']
            }).present();
          }

          console.error(`Error: ${ res.d }`);
          Observable.throw(res.d || 'Server error'); //...throw error description
        } else {
          if (res.token) {
            this.token = res.token;
          }

          return res;
        }
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }
}
