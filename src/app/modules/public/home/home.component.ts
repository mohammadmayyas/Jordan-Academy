import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CourseService } from 'src/app/core/services/course.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { environment as env } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CertificateService } from 'src/app/core/services/certificate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  coursesList: any[] = [];
  apiRoot = env.apiRoot;

  constructor(
    public translate: TranslateService,
    public sharedService: SharedService,
    private courseService: CourseService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private certificateService: CertificateService 
    ) { }

  ngOnInit(): void {
    this.getFirstThreeCourses();
  }

  getFirstThreeCourses(){
    this.spinner.show();
    this.courseService.getAllCourses().subscribe((res: any) =>{
      for(var i=0; i<4; i++){
        this.coursesList.push(res[i]);
      };
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toaster.error("Somthing went wrong..");
    });
  }

  SearchForCertificate(serialNumber: string){
    if(serialNumber != ''){
      const options = { opacity: 0.5 };
      this.certificateService.SearchForCertificate(serialNumber.toUpperCase()).subscribe((res: any) =>{
        if(res)
          this.toaster.success('Verfid certificate', '', {
            timeOut: 5000,
            positionClass: 'toast-bottom-left'
          });
        else
          this.toaster.error('Not verfid certificate', '', {
            timeOut: 5000,
            positionClass: 'toast-bottom-left'
          });
      }, err => {
        this.toaster.error("Somthing went wrong..");
      });
    }
  }

}
