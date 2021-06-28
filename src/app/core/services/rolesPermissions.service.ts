import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class RolesPermissionsService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  getAllRoles(){
    return this.http.get(`${env.apiRoot}/api/Role`);
  }

  getAllRolesWithPermissions(){
    return this.http.get(`${env.apiRoot}/api/Role/GetAllRolesWithPermissions`);
  }

  createRole(role: any){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Role`, role).subscribe(res =>{
      this.spinner.hide();
    }, err =>{
      this.spinner.hide();
    });
  }

  getAllPermissions(){
    return this.http.get(`${env.apiRoot}/api/Permission`);
  }

  createPermission(permission: any){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Permission`, permission).subscribe(res =>{
      this.spinner.hide();
    }, err =>{
      this.spinner.hide();
    });
  }

  addPermissionsToRole(rolePermissions: any){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Role/AddPermissionToRole`, rolePermissions).subscribe(res =>{
      this.spinner.hide();
    }, err =>{
      this.spinner.hide();
    });
  }

  getRolesPermissionsIds(){
    return this.http.get(`${env.apiRoot}/api/Role/GetRolesPermissionsIds`);
  }

  deletePermission(permissionId: number){
    this.spinner.show();
    return this.http.delete(`${env.apiRoot}/api/Permission/${permissionId}`).subscribe((res : any) => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  updatePermission(permissionId: number, permission: any){
    this.spinner.show();
    return this.http.put(`${env.apiRoot}/api/Permission/${permissionId}`, permission).subscribe((res : any) => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  updateRolePermissions(rolePermissions: any[]){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Role/UpdateRolePermissions`, rolePermissions).subscribe((res : any) => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  deleteRole(roleId: number){
    this.spinner.show();
    return this.http.delete(`${env.apiRoot}/api/Role/${roleId}`).subscribe((res : any) => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  updateRole(roleId: number, role: any){
    this.spinner.show();
    return this.http.put(`${env.apiRoot}/api/Role/${roleId}`, role).subscribe((res : any) => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

}
