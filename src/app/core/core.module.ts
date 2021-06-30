import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GetCheckedPermissionsPipe } from './pipes/get-checked-permissions.pipe';
import { GetCheckedRolesPipe } from './pipes/get-checked-roles.pipe';
import { SidnavComponent } from './sidnav/sidnav.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    GetCheckedPermissionsPipe,
    GetCheckedRolesPipe,
    SidnavComponent,
    
  ],
  imports: [
    CommonModule,
  ],
  //exports: [HasPermissionDirective]
})
export class CoreModule { }
