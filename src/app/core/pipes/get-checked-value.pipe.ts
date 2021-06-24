import { Pipe, PipeTransform } from '@angular/core';
import { rolePermissions } from '../interfaces/rolePermissions';
import { SharedService } from '../services/shared.service';

@Pipe({
  name: 'getCheckedValue',
  pure: true
})
export class GetCheckedValuePipe implements PipeTransform {

  roleId: number = 0;
  rolesList: any ;
  rolePermissions: any[] = [];
  constructor(
    private sharedService: SharedService,
    ){}

  transform(args: any[], value: number): boolean {
    return this.getCheckedValue(args, value);
   
  }

  getCheckedValue(args: any[], value: number): boolean{
    let isChecked: boolean = false
    this.rolesList = args;
    this.sharedService.currentroleId.subscribe(roleId => this.roleId = roleId);
    this.rolesList.forEach((element: any) => {
      if(element.roleId == this.roleId){
        element.permissions.forEach((element2: any) => {
          if(value == element2.permissionId ){
            isChecked = true;
          }
        });
      }
    });
    return isChecked;
  }
}
