import { inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PipesPipe } from './pipes/pipes.pipe';
import { GetCheckedValuePipe } from './pipes/get-checked-value.pipe';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    PipesPipe,
    GetCheckedValuePipe
  ],
  imports: [
    CommonModule,
  ]
})
export class CoreModule { }
