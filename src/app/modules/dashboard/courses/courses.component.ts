import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateCourseComponent } from './create-update-course/create-update-course.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
  }
 
  openDialog() {
    this.dialog.open(CreateUpdateCourseComponent);
  }

}
