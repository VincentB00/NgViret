import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EssentialModule } from './shared/modules/Essential.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthIntercepter } from './shared/guards/auth.intercepter';
import { HomeDetailComponent } from './home/home-detail/home-detail.component';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { FilterNamePipe } from './shared/pipes/filter-name.pipe';
import { FilterNameReversePipe } from './shared/pipes/filter-name-reverse.pipe';
import { ItemListComponent } from './item-list/item-list.component';
import { AccountComponent } from './account/account.component';
import { SettingComponent } from './account/setting/setting.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    HomeDetailComponent,
    AccountManagerComponent,
    FilterNamePipe,
    FilterNameReversePipe,
    ItemListComponent,
    AccountComponent,
    SettingComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EssentialModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthIntercepter,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
