import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageComponent} from './user-page/user-page.component';
import { UserStatisticsComponent} from './user-statistics/user-statistics.component';
import {MainPageComponent} from './main-page/main-page.component';
import {UserExerciseComponent} from './user-exercise/user-exercise.component';
import {ExerciseViewComponent} from './exercise-view/exercise-view.component';

const routes: Routes = [
  { path: 'userPage/:id', component: UserPageComponent},
  { path: 'userStatistics/:id', component: UserStatisticsComponent},
  { path: '', component: MainPageComponent},
  { path: 'exercise/:id', component: UserExerciseComponent},
  { path: 'exerciseView/:id', component: ExerciseViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
