import { Component, OnInit } from '@angular/core';
import { User} from '../user';
import { MongoDBService} from '../mongo-db.service';
import { AuthService, FacebookLoginProvider} from 'angular-6-social-login';
import { Router} from '@angular/router';
import {StateServiceService} from '../state-service.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  testUser: User;
  user: User;

  constructor(private service: MongoDBService,
              private router: Router,
              private authService: AuthService,
              public stateService: StateServiceService) { }

  ngOnInit() {
    this.service.getUserByFId('1').subscribe((user: User) => {
      this.testUser = user;
    });
  }

  public socialSignIn() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userData) => {
        console.log('try to search Fb user');
        this.service.getUserByFId(userData.id).subscribe((user: User) => {
          this.user = user;
          console.log(user);
          if (this.user === null) {
            this.user = new User(userData.id, userData.name);
            console.log(`Try to add new user ${this.user.userName}`);
            this.service.addUser(this.user);
          } else {
            console.log(`We find FB user with name ${this.user.userName}`);
          }
          sessionStorage.setItem('user', this.user.facebookId);
        });
        setTimeout(() => {
          console.log('ROUTE');
          this.router.navigateByUrl(`/userPage/${this.user.userName}`);
        }, 200);
      }
    );
  }

  public tester() {
    sessionStorage.setItem('user', this.testUser.facebookId);
  }
}
