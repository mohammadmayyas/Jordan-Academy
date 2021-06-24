import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/core/services/course.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-update-course',
  templateUrl: './create-update-course.component.html',
  styleUrls: ['./create-update-course.component.scss']
})
export class CreateUpdateCourseComponent implements OnInit {

  courseForm = new FormGroup({
    courseName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10000)]),
    courseLevel: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)]),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    courseImage: new FormControl('', [
      Validators.required]),
  })
  constructor(
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<CreateUpdateCourseComponent>,
    private router: Router,
    private sharedService: SharedService,
    public datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    if (this.data && this.data.courseId) {
      this.courseForm.controls.courseName.setValue(this.data.courseName);
      this.courseForm.controls.description.setValue(this.data.description);
      this.courseForm.controls.courseLevel.setValue(this.data.courseLevel);
      this.courseForm.controls.startDate.setValue(this.data.startDate);
      this.courseForm.controls.endDate.setValue(this.data.endDate);
      this.courseForm.controls.courseImage.setValue(this.data.courseImage);
    }
  }

  saveItem(){
    const value = this.courseForm.value;
  
    if (this.data && this.data.courseId) {
      this.dialog.close({
        ...value,
        courseId: this.data.courseId
      })
    } else {
      this.dialog.close(value);
      this.createCourse(value);
    }
  }

  createCourse(course: any){
    const formData: FormData = new FormData();
    let startDateTime = this.courseForm.controls.startDate.value;
    let endDateTime = this.courseForm.controls.endDate.value;
    let startDate =this.datepipe.transform(startDateTime, 'yyyy-MM-dd');
    let endDate =this.datepipe.transform(endDateTime, 'yyyy-MM-dd');
    formData.append('courseName', this.courseForm.controls.courseName.value);
    formData.append('description', this.courseForm.controls.description.value);
    formData.append('courseLevel', this.courseForm.controls.courseLevel.value);
    formData.append('startDate', `${startDate}`);
    formData.append('endDate', `${endDate}`);
    formData.append('courseImage', this.courseForm.controls.courseImage.value);

    this.courseService.createCourse(formData);
    this.sharedService.reload(this.router.url);
  }
}
