import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CambiarContraseniaComponent } from './components/login/cambiar-contrasenia/cambiar-contrasenia.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';

// PRIME NG
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MenubarModule } from 'primeng/menubar';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SidebarComponent,
    CambiarContraseniaComponent,
    CatalogoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    SidebarModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ToastModule,
    DividerModule,
    TooltipModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    DialogModule,
    ScrollPanelModule,
    MenubarModule,
    CalendarModule,
    TableModule,
    ImageModule

  ],
  providers: [
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
