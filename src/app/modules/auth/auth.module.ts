import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    TranslateModule
  ]
})
export class AuthModule { }
