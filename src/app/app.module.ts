import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule} from '@angular/material-moment-adapter';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAfBkERU_PD51MZu7HTD2GCyUj3-i3ft4'
    }),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatMomentDateModule
  ],
  providers: [
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
