import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'src/app/core/services/shared.service';
import { CertificateService } from 'src/app/core/services/certificate.service';
import { UserService } from 'src/app/core/services/user.service';

export class AdminResponse{
  certificateId: number;
  adminResponse: string;
  constructor(certificateId: number, adminResponse: string){
    this.certificateId = certificateId;
    this.adminResponse = adminResponse;
  }
}

@Component({
  selector: 'app-get-certificates-requests',
  templateUrl: './get-certificates-requests.component.html',
  styleUrls: ['./get-certificates-requests.component.scss']
})
export class GetCertificatesRequestsComponent implements OnInit {

  requestsList: any[] = [];
  No: number = 0;
  adminResponse: any;
  displayedColumns: string[] = ['No', 'TraineeName', 'Course', 'RequestDate', 'Operations'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private userService: UserService,
    private sharedService: SharedService,
    private certificateService: CertificateService
  ) { }

  ngOnInit(): void {
    this.getAllCertificatesRequests();
  }

  getAllCertificatesRequests(){
    this.spinner.show();
    this.certificateService.getAllCertificatesRequests().subscribe((res: any) => {
      this.requestsList = res;
      this.dataSource = new MatTableDataSource(this.requestsList);
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  rejectCertificateRequest(certificateId: number){
    this.adminResponse = new AdminResponse(certificateId, 'Reject');
    this.userService.ResponseForGetCertificateRequest(this.adminResponse);
    this.sharedService.reload(this.router.url);
  }

  approveCertificateRequest(certificateId: number){
    this.adminResponse = new AdminResponse(certificateId, 'Approve');
    this.userService.ResponseForGetCertificateRequest(this.adminResponse);
    this.sharedService.reload(this.router.url);
  }

}
