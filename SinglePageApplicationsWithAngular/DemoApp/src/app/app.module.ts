import { HighlightItemDirective } from './directives/highlight-item.directive';
import { SortPipePipe } from './pipes/SortPipe.pipe';
import { MyUpperCasePipe } from './pipes/MyUpperCase.pipe';
import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { AboutComponent } from './components/about/about.component';

const appRoutes: Routes = [
  { path: '', component: UserComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AboutComponent,
    MyUpperCasePipe,
    SortPipePipe,
    HighlightItemDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})

export class AppModule { }
