
export class User {
  facebookId: string;
  userTraining: Training[];
  userName: string;
  _id: Object;

  constructor(facebookId: string, name: string) {
    this.facebookId = facebookId;
    this.userName = name;
    this.userTraining = [];
  }
}

export class Training {
  trainingName: string;
  userExercises: Exercise[];

  constructor(trainingName: string) {
    this.trainingName = trainingName;
    this.userExercises = [];
  }
}

export class Exercise {
  exerciseName: string;
  param1: string;
  param2: string;
  count: number;
  exerciseFinished: ExerciseFinished[];


  constructor(exerciseName: string, param1: string, param2: string, count: number) {
    this.exerciseName = exerciseName;
    this.param1 = param1;
    this.param2 = param2;
    this.count = count;
    this.exerciseFinished = [];
  }
}

export class ExerciseFinished {
  date: Date;
  param1: number[];
  param2: number[];

  constructor() {
    this.date = new Date();
    this.param1 = [];
    this.param2 = [];
  }

  add(param1: number, param2: number) {
    this.param1.push(param1);
    this.param2.push(param2);
  }

}



