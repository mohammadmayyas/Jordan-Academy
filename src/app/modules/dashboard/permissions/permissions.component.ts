import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { RolesPermissionsService } from 'src/app/core/services/rolesPermissions.service';
import { CreateUpdatePermissionComponent } from './create-update-permission/create-update-permission.component';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  
  }

  openDialog() {
    this.dialog.open(CreateUpdatePermissionComponent);
  }



}
