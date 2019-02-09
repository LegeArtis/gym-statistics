import { Component, OnInit } from '@angular/core';
import {MongoDBService} from '../mongo-db.service';
import {Training, User} from '../user';
import {StateServiceService} from '../state-service.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(private mongoDB: MongoDBService,
              public state: StateServiceService) { }

  user: User;

  ngOnInit() {
  this.mongoDB.getUserByFId(sessionStorage.getItem('user')).subscribe((user: User) => {
    this.user = user;
  });
  }

  addTraining(trainingName) {
    const training = new Training(trainingName);
    this.user.userTraining.push(training);
    this.mongoDB.updateUsers(this.user);
  }
  delete(training) {
    if (confirm('Are you sure to delete this training')) {
      const index = this.user.userTraining.indexOf(training);
      this.user.userTraining.splice(index, 1);
      this.mongoDB.updateUsers(this.user);
    }
  }
  choice(training: Training) {
    sessionStorage.setItem('training', this.user.userTraining.indexOf(training).toString());
  }

  exit() {
    this.user = null;
  }
}
