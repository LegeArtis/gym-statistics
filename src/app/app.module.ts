import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserPageComponent} from './user-page/user-page.component';
import {UserStatisticsComponent} from './user-statistics/user-statistics.component';
import {MainPageComponent} from './main-page/main-page.component';
import {MongoDBService} from './mongo-db.service';
import {HttpClientModule} from '@angular/common/http';
import {UserExerciseComponent} from './user-exercise/user-exercise.component';
import {ExerciseViewComponent} from './exercise-view/exercise-view.component';
import {FormsModule} from '@angular/forms';
import {AuthServiceConfig, FacebookLoginProvider, SocialLoginModule} from 'angular-6-social-login';
import {StateServiceService} from './state-service.service';

// Configs
export function getAuthServiceConfigs() {
  return new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('323630145026369')
      }
    ]
  );
}

@NgModule({
  declarations: [
    AppComponent,
    UserPageComponent,
    UserStatisticsComponent,
    MainPageComponent,
    UserExerciseComponent,
    ExerciseViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    MongoDBService,
    StateServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

