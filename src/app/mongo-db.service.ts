import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class MongoDBService {

  url = 'http://localhost:4000';

  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get(`${this.url}`);
  }

  getUserById(id) {
    return this.http.get(`${this.url}/findById/${id}`);
  }

  updateUsers(user: User): void {
    this.http.post(`${this.url}/update/${user._id}`, user).subscribe(res => console.log('Update Done'));
  }
}
