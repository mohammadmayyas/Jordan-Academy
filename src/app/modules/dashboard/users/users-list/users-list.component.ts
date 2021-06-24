import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  usersList: any[] = [];
  dataSource = new MatTableDataSource();
  
  displayedColumns: string[] = ['No', 'UserName', 'FirstNameEn', 'LastNameEn', 'Roles', 'Email', 'PhoneNumber', 'Gender', 'DateOfBirth', 'City', 'Address', 'UserImage', 'Operations'];
  constructor(
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.usersList = res;
      console.log(this.usersList);
      this.dataSource = new MatTableDataSource(this.usersList);
      console.log(this.dataSource);
    }, err => {
      this.toastr.error(err.error)
    });
  } 

  deleteUser(userId: number){
    this.userService.deleteUser(userId);
    this.sharedService.reload(this.router.url);
  }

 applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  // getUserRoles(){
  //   this.usersList.forEach(ele =>{
  //     ele.roles;
  //   })
  // }

}
