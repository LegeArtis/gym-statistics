import {Component, OnInit, ViewChild} from '@angular/core';
import {ExerciseFinished, User} from '../user';
import {isNumber} from 'util';
import {MongoDBService} from '../mongo-db.service';
import { Location} from '@angular/common';

@Component({
  selector: 'app-exercise-view',
  templateUrl: './exercise-view.component.html',
  styleUrls: ['./exercise-view.component.css']
})
export class ExerciseViewComponent implements OnInit {
  @ViewChild('Form') formValues;

  user: User;
  trainingIndex: number;
  exerciseIndex: number;
  countLeft: number;
  exerciseFinished = new ExerciseFinished();

  constructor(private mongoDB: MongoDBService,
              private location: Location) { }

  ngOnInit() {
    if (isNumber(+sessionStorage.getItem('training'))) {
      this.trainingIndex = +sessionStorage.getItem(('training'));
    }
    if (isNumber(+sessionStorage.getItem('exercise'))) {
      this.exerciseIndex = +sessionStorage.getItem(('exercise'));
    }
    this.mongoDB.getUserByFId(sessionStorage.getItem('user')).subscribe((user: User) => {
      this.user = user;
      this.countLeft = user.userTraining[this.trainingIndex].userExercises[this.exerciseIndex].count;
    });
  }

  exerciseDone(param1: number, param2: number) {
    this.formValues.resetForm();
    if (param2 && param1) {
      console.log(`param1: ${param1}  param2: ${param2}`);
      this.exerciseFinished.add(param1, param2);
      this.countLeft = this.countLeft - 1;
      if (this.countLeft === 0) {
        this.user.userTraining[this.trainingIndex].userExercises[this.exerciseIndex].exerciseFinished.push(this.exerciseFinished);
        this.mongoDB.updateUsers(this.user);
      }
    }
  }
  exit() {
    this.user = null;
  }
  back() {
    this.location.back();
  }

}
