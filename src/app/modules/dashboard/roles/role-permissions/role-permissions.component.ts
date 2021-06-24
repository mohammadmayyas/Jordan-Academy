import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RolesPermissionsService } from 'src/app/core/services/rolesPermissions.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { rolePermissions } from 'src/app/core/interfaces/rolePermissions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-role-permissions',
  templateUrl: './role-permissions.component.html',
  styleUrls: ['./role-permissions.component.scss']
})
export class RolePermissionsComponent implements OnInit {

  permissionsList: any[] = [];
  rolesWithPermissinsList: any[] = [];
  displayedColumns: string[] = ['Permission', 'Checkbox'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  roleId: number = 0;
  rolesList: any[] = [];
  rolePermissions: any[] = [];
  isChecked: boolean = false;

  roleForm = new FormGroup({
    roleName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25)]),
  })
  constructor( 
    private rolesPermissionsService: RolesPermissionsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<RolePermissionsComponent>,
    private rolesPermissionService: RolesPermissionsService,
    private sharedService: SharedService,
    private router: Router
    ) {
      this.getAllRolesWithPermissions();
    }

  ngOnInit(): void {
    this.getAllPermissions();
    this.sharedService.currentroleId.subscribe(roleId => this.roleId = roleId);
  }


  getAllPermissions(){
    this.rolesPermissionService.getAllPermissions().subscribe((res: any) => {
      this.permissionsList = res;
      this.dataSource = new MatTableDataSource(this.permissionsList);
      this.dataSource.paginator = this.paginator;
    }, err =>{

    });
  }

  getAllRolesWithPermissions(){
    this.rolesPermissionsService.getAllRolesWithPermissions().subscribe((res: any) => {
      this.rolesList = res;
    }, err => {

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setRolePermissions(permissionId: number){
    let index = this.rolePermissions.findIndex(m => (m.roleId == this.roleId) && (m.permissionId == permissionId));
    if(index >= 0)
      this.rolePermissions.splice(index, 1);
    else
      this.rolePermissions.push(new rolePermissions(this.roleId, permissionId));
    console.log(this.rolePermissions);
  }

  saveItem(){
    this.rolesPermissionService.updateRolePermissions(this.rolePermissions);
    this.sharedService.reload(this.router.url);
  }

}
