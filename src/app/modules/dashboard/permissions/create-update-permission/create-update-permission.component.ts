import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RolesPermissionsService } from 'src/app/core/services/rolesPermissions.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-update-permission',
  templateUrl: './create-update-permission.component.html',
  styleUrls: ['./create-update-permission.component.scss']
})
export class CreateUpdatePermissionComponent implements OnInit {

  permissionForm = new FormGroup({
    permissionName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)]),
  })
  constructor(
    private rolesPermissionsService: RolesPermissionsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<CreateUpdatePermissionComponent>,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.data && this.data.roleId) {
      this.permissionForm.controls.permissionName.setValue(this.data.permissionName);
    }
  }

  saveItem(){
    this.rolesPermissionsService.createPermission(this.permissionForm.value);
    this.sharedService.reload(this.router.url);
  }

}
