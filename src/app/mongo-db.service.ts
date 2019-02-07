import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class MongoDBService {

  url = 'https://gymstat.biz.ua';

  constructor(private http: HttpClient) { }

  updateUsers(user: User): void {
    this.http.post(`${this.url}/update/${user._id}`, user).subscribe(res => console.log('Update Done'));
  }

  addUser(user: User): void {
    this.http.post(`${this.url}/add`, user).subscribe( res => console.log(`New User ${user.userName} add to Database!`));
  }

  getUserByFId(id) {
    return this.http.get(`${this.url}/findByFId/${id}`);
  }
}
