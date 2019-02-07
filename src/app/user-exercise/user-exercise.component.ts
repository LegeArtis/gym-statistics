import {Component, OnInit, ViewChild} from '@angular/core';
import {Exercise, User} from '../user';
import {MongoDBService} from '../mongo-db.service';
import {isNumber} from 'util';
import {Location} from '@angular/common';


@Component({
  selector: 'app-user-exercise',
  templateUrl: './user-exercise.component.html',
  styleUrls: ['./user-exercise.component.css']
})
export class UserExerciseComponent implements OnInit {
  @ViewChild('myForm') formValues;

  user: User;
  index: number;
  createMode = true;

  constructor(private mongoDB: MongoDBService,
              private location: Location) { }

  ngOnInit() {
    this.mongoDB.getUserByFId(sessionStorage.getItem('user')).subscribe((user: User) => {
      this.user = user;
    });
    if (isNumber(+sessionStorage.getItem('training'))) {
      this.index = +sessionStorage.getItem(('training'));
    }
  }

    finish(exerciseName: string, param1: string, param2: string, count: number) {
     if (exerciseName && param1 && param2 && count) {
        const exercise = new Exercise(exerciseName, param1, param2, count);
        this.user.userTraining[this.index].userExercises.push(exercise);
        this.mongoDB.updateUsers(this.user);
        this.formValues.resetForm();
    }
     this.createMode = true;
     this.formValues.resetForm();
  }

  deleteExercise(exercise: Exercise) {
    const indexToDelete = this.user.userTraining[this.index].userExercises.indexOf(exercise);
    this.user.userTraining[this.index].userExercises.splice(indexToDelete, 1);
    this.mongoDB.updateUsers(this.user);
  }
  isCreateMode() {
    this.createMode = false;
  }
  choice(exercise: Exercise) {
    sessionStorage.setItem('exercise', this.user.userTraining[this.index].userExercises.indexOf(exercise).toString());
  }
  back() {
    this.location.back();
  }
  exit() {
    this.user = null;
  }
}
