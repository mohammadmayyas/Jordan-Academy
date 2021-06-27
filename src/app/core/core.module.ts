import { inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
//import { PipesPipe } from './pipes/pipes.pipe';
import { GetCheckedPermissionsPipe } from './pipes/get-checked-permissions.pipe';
import { GetCheckedRolesPipe } from './pipes/get-checked-roles.pipe';



@NgModule({
  declarations: [
    PageNotFoundComponent,
 //   PipesPipe,
    GetCheckedPermissionsPipe,
 GetCheckedRolesPipe
  ],
  imports: [
    CommonModule,
  ]
})
export class CoreModule { }
