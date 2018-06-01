import { Injectable } from '@angular/core';
import { Card } from '../../models/card';
import { ProfileGetData } from '../../models/profile-get-data';
import { ProfileRemoveData } from '../../models/profile-remove-data';
import { ProfileSaveData } from '../../models/profile-save-data';
import { User } from '../../models/user';
import { RequestData } from '../../models/request-data';
import { AlertController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public notifications: Subject<number> = new Subject();

  get domain (): string {
    return this._domain;
  }

  private _domain: string = 'https://www.wiredmates.com/';
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
   * Get user data and token from local storage
   */
  public loadUserData (): void {
    this.token = localStorage.getItem('token'); // get token from local storage
    const user = localStorage.getItem('user'); // get user data from local storage
    if (user) {
      this.user = new User(JSON.parse(user)); // parse and set user
      this.notifications.next(this.user.notifications);
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

      this.notifications.next(this.user.notifications);
    }
  }

  /**
   * Sign in user
   * @param user
   * @returns {Observable<RequestData>}
   */
  public signIn (user: any): Observable<RequestData> {
    user.action = 'login';
    return this.postRequest(user);
  }

  /**
   * Sign up user
   * @param user
   * @returns {Observable<RequestData>}
   */
  public signUp (user: any): Observable<RequestData> {
    user.action = 'register';
    return this.postRequest(user);
  }

  /**
   * Log out user
   * @returns {Observable<RequestData>}
   */
  public logOut (): Observable<RequestData> {
    return this.postRequest({
      action: 'logout',
      token: this.token
    });
  }

  /**
   * Store user contact card from backend
   * @param {Card} card
   */
  public storeUserContact (card: Card): void {
    let cardIndex = this.user.contacts.findIndex((contactCard: Card) => contactCard.id === card.id);
    if (cardIndex !== -1) {
      this.user.contacts[cardIndex] = card;
    } else {
      this.user.contacts.push(card);
    }

    console.log(this.user.contacts);

    this.storeUserData(this.token, this.user);
  }

  /**
   * Verify registration code
   * @param code
   * @returns {Observable<RequestData>}
   */
  public verify (code: any): Observable<RequestData> {
    code.action = 'verification';
    return this.postRequest(code);
  }

  /**
   * Re send verification code
   * @param email
   * @returns {Observable<RequestData>}
   */
  public resendVerificationCode (email: string): Observable<RequestData> {
    return this.postRequest({
      action: 'resendVerificationCode',
      email: email
    });
  }

  /**
   * Register user type
   * @param type
   * @returns {Observable<RequestData>}
   */
  public registerUserType (type: any): Observable<RequestData> {
    return this.postRequest({
      action: 'registerUserType',
      email: type.email,
      type: type.type,
      organization: type.organization,
      occupation: type.occupation,
      agree: type.agree,
    });
  }

  /**
   * Delete account
   * @returns {Observable<RequestData>}
   */
  public deleteAccount (): Observable<RequestData> {
    return this.postRequest({
      action: 'deleteMyAccount',
      username: 'arsenbabajanyan95@gmail.com',
      password: '12345678',
    });
  }

  public getProfile (card: any): Observable<RequestData> {
    return this.postRequest({
      action: 'getProfile',
      id: card.id,
      token: this.token,
    });
  }

  /**
   * Save profile details
   * @param {Card} card
   * @returns {Observable<RequestData>}
   */
  public saveContactDetails (card: any): Observable<RequestData> {
    card.action = 'saveContactDetails';
    card.token = this.token;

    return this.postRequest(card);
  }

  /**
   * Get my cards
   * @returns {Observable<RequestData>}
   */
  public getMyCards (): Observable<RequestData> {
    return this.postRequest({
      action: 'getMyCards',
      token: this.token
    });
  }

  /**
   * Get mates by search query
   * @param data
   * @returns {Observable<RequestData>}
   */
  public findProfile (data: any): Observable<RequestData> {
    return this.postRequest({
      action: 'findProfile',
      key: data.key,
      type: data.type,
      lastID: data.lastID,
      token: this.token
    });
  }

  /**
   * Card Request by id
   * @param data
   * @returns {Observable<RequestData>}
   */
  public cardRequest (data: any): Observable<RequestData> {
    return this.postRequest({
      action: 'cardRequest',
      id: data.id,
      profileID: data.profileID,
      token: this.token
    });
  }

  /**
   * Answer On Card Request
   * @param data
   * @returns {Observable<RequestData>}
   */
  public answerOnCardRequest (data: any): Observable<RequestData> {
    return this.postRequest({
      action: 'answerOnCardRequest',
      answer: data.answer,
      id: data.id,
      token: this.token
    });
  }

  /**
   * Get My Messages
   * @param data
   * @returns {Observable<RequestData>}
   */
  public getMessages (data: any): Observable<RequestData> {
    return this.postRequest({
      action: 'getMyMessages',
      id: data.id,
      roomKey: data.roomKey,
      profileID: data.profileID,
      receiverProfileID: data.receiverProfileID,
      senderProfileID: data.senderProfileID,
      token: this.token
    });
  }

  /**
   * Send Message
   * @param message
   * @returns {Observable<RequestData>}
   */
  public sendMessage (message: any): Observable<RequestData> {
    return this.postRequest({
      action: 'sendMessage',
      receiverID: message.receiverID,
      receiverProfileID: message.receiverProfileID,
      senderProfileID: message.senderProfileID,
      message: message.message,
      token: this.token
    });
  }

  /**
   * Get my notifications
   * @param notify
   * @returns {Observable<RequestData>}
   */
  public getMyNotifications (notify: any): Observable<RequestData> {
    return this.postRequest({
      action: 'getMyNotifications',
      id: notify.id,
      token: this.token
    });
  }

  /**
   * Mark my notifications as
   * @param notify
   * @returns {Observable<RequestData>}
   */
  public markMyNotificationsAs (notify: any): Observable<RequestData> {
    return this.postRequest({
      action: 'markMyNotificationsAs',
      ids: notify.ids,
      unread: notify.unread,
      token: this.token
    });
  }

  /**
   * Delete my notifications
   * @param notify
   * @returns {Observable<RequestData>}
   */
  public deleteMyNotifications (notify: any): Observable<RequestData> {
    return this.postRequest({
      action: 'deleteMyNotifications',
      ids: notify.ids,
      token: this.token
    });
  }

  /**
   * Get contact recommendations
   * @param contact
   * @returns {Observable<RequestData>}
   */
  public getContactRecommendations (contact: any): Observable<RequestData> {
    return this.postRequest({
      action: 'getContactRecommendations',
      id: contact.id,
      token: this.token
    });
  }

  /**
   * Save contact recommendations
   * @param data
   * @returns {Observable<RequestData>}
   */
  public saveContactRecommendations (data: any): Observable<RequestData> {
    return this.postRequest({
      action: 'saveContactRecommendations',
      id: data.id,
      data: [data.recommendations],
      token: this.token
    });
  }

  public saveRecommendationsForCard (data: any): Observable<RequestData> {
    return this.postRequest({
      action: 'saveRecommendationsForCard',
      id: data.id,
      profileID: data.profileID,
      recVal: data.recVal,
      recBy1: data.recBy1,
      recBy2: data.recBy2,
      recBy3: data.recBy3,
      recBy4: data.recBy4,
      recBy5: data.recBy5,
      state: data.state,
      token: this.token
    });
  }

  /**
   * Get Profile Contact (card) data
   * @param data
   * @returns {Observable<RequestData>}
   */
  public getProfileContactData (data: ProfileGetData): Observable<RequestData> {
    return this.postRequest({
      action: data.action,
      id: data.id,
      token: this.token
    });
  }

  /**
   * Save Profile Contact (card) data
   * @param {ProfileSaveData} data
   * @returns {Observable<RequestData>}
   */
  public saveProfileContactData (data: ProfileSaveData): Observable<RequestData> {
    return this.postRequest({
      action: data.action,
      id: data.id,
      data: data.data,
      token: this.token
    });
  }

  /**
   * Remove Profile Contact (card) data
   * @param {ProfileRemoveData} data
   * @returns {Observable<RequestData>}
   */
  public removeProfileContactData (data: ProfileRemoveData): Observable<RequestData> {
    return this.postRequest({
      action: data.action,
      id: data.id,
      delID: data.delID,
      token: this.token
    });
  }

  /**
   * Get Contact Files
   * @param contact
   * @returns {Observable<RequestData>}
   */
  public getContactFiles (contact: any): Observable<RequestData> {
    console.log(contact);
    return this.postRequest({
      action: 'getContactFiles',
      id: contact.id,
      token: this.token
    });
  }

  /**
   * Save Contact Files
   * @param contact
   * @returns {Observable<RequestData>}
   */
  public saveContactFiles (contact: any): Observable<RequestData> {
    return this.postRequest({
      action: 'saveContactFiles',
      id: contact.id,
      data: contact.files,
      token: this.token
    });
  }

  /**
   * Remove Contact Files
   * @param contact
   * @returns {Observable<RequestData>}
   */
  public removeContactFile (contact: any): Observable<RequestData> {
    return this.postRequest({
      action: 'removeContactFile',
      id: contact.id,
      delID: contact.delID,
      token: this.token
    });
  }

  /**
   * Upload Contact File
   * @param contact
   * @returns {Observable<RequestData>}
   */
  public uploadContactFile (contact: any): Observable<RequestData> {
    let formData: FormData = new FormData();
    formData.append('action', 'uploadContactFile');
    formData.append('id', contact.id);
    formData.append('file', contact.file, contact.file.name);
    formData.append('token', this.token);

    let headers = new Headers();
    let options = new RequestOptions({headers: headers});

    return this.postRequest(formData, options);
  }

  /**
   * Get Contact Medias
   * @param contact
   * @returns {Observable<RequestData>}
   */
  public getContactMedias (contact: any): Observable<RequestData> {
    return this.postRequest({
      action: 'getContactMedias',
      id: contact.id,
      token: this.token
    });
  }

  /**
   * Save Contact Medias
   * @param contact
   * @returns {Observable<RequestData>}
   */
  public saveContactMedias (contact: any): Observable<RequestData> {
    return this.postRequest({
      action: 'saveContactMedias',
      id: contact.id,
      data: contact.files,
      token: this.token
    });
  }

  /**
   * Remove Contact Medias
   * @param contact
   * @returns {Observable<RequestData>}
   */
  public removeContactMedia (contact: any): Observable<RequestData> {
    return this.postRequest({
      action: 'removeContactMedia',
      id: contact.id,
      delID: contact.delID,
      token: this.token
    });
  }

  /**
   * Upload Contact Media
   * @param contact
   * @returns {Observable<RequestData>}
   */
  public uploadContactMedia (contact: any): Observable<RequestData> {
    let formData: FormData = new FormData();
    formData.append('action', 'uploadContactMedia');
    formData.append('id', contact.id);
    formData.append('file', contact.file, contact.file.name);
    formData.append('token', this.token);

    let headers = new Headers();
    let options = new RequestOptions({headers: headers});

    return this.postRequest(formData, options);
  }

  /**
   * Change default profile (contact)
   * @param card
   * @returns {Observable<RequestData>}
   */
  public changeDefaultProfile (card: any): Observable<RequestData> {
    return this.postRequest({
      action: 'changeDefaultProfile',
      id: card.id,
      token: this.token
    });
  }

  /**
   * On token expired
   * @returns {Observable}
   */
  public onRoot (): Observable<any> {
    return this.tokenExpired.asObservable();
  }

  /**
   * Post request by data
   * @param data
   * @param {RequestOptions} options
   * @returns {Observable<RequestData>}
   */
  private postRequest (data: any, options?: RequestOptions): Observable<RequestData> {
    let headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
    options = options || new RequestOptions({headers: headers}); // Create a request option

    return this.http.post(this._domain + 'api/', data, options) // ...using put request
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
