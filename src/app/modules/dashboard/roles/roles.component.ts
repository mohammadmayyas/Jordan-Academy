import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { RolesPermissionsService } from 'src/app/core/services/rolesPermissions.service';
import { CreateUpdateRoleComponent } from './create-update-role/create-update-role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  constructor(
    private rolesPermissionsService: RolesPermissionsService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(CreateUpdateRoleComponent);
  }

}
