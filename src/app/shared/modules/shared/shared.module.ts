import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDividerModule } from '@angular/material/divider';
import { HasPermissionDirective } from './directives/has-permission.directive';


const shared = [
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTableModule,
  MatIconModule,
  MatMenuModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  NgxSpinnerModule,
  NgxMatFileInputModule,
  MatSidenavModule,
  MatListModule,
  CdkTableModule,
  MatDialogModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatCardModule,
  MDBBootstrapModule.forRoot(),
  Ng2SearchPipeModule,
  MatDividerModule,

];


@NgModule({
  declarations: [HasPermissionDirective],
  imports: [shared],
  exports:[shared, HasPermissionDirective]
})
export class SharedModule { }
