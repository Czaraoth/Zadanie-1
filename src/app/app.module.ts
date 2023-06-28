import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {PopUpService} from "./service/popup.service";
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {MarkerService} from "./service/marker.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [MarkerService,
  PopUpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
