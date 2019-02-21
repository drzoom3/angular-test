import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatIconModule,
  MatGridListModule,
  MatToolbarModule,
  MatDialogModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { AlertDialog } from './app.component'

@NgModule({
  declarations: [
    AppComponent,
    AlertDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatToolbarModule,
    MatDialogModule
  ],  
  exports: [
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AlertDialog]
})
export class AppModule { }
