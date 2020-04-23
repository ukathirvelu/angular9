import { Component, Input } from '@angular/core';
import { JsonService } from './service/json.service';
import { TeamMembersDTO } from 'teamMember';

/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'expansion-overview-example',
  templateUrl: 'expansion-overview-example.html',
  styleUrls: ['expansion-overview-example.css'],
})
export class ExpansionOverviewExample {
  
  data = new Array<any>();
  uData = new Array<any>();

  courseCount: number;
  postStatus: number;
  showAddCourse = false;
  showCourseList = true;
  addCourseCount = 0;
  addCourseResult:string;

  ongoingTrainings = new Array<any>();
  upcomingTrainings  = new Array<any>();
  step = 0;

  constructor(private jsonServer: JsonService) { }
  

  setStep(index: number) {
    this.step = index;
    if(index == 10) {
      this.getOngoingCourses();
    } else if (index == 11) {
      this.getUpcomingCourses();
    }
    
  }
  getTrainingStatus() {
    if (this.addCourseCount == 0) {
      if (this.data.length > 0 && this.showCourseList != false) {
        this.showCourseList = false;

      } else {
        this.getCourseList();
      }
    } else {
      this.getCourseList();
    }
  }
  
  getOngoingCourses() {
    this.jsonServer.getOngoingCourses().subscribe (data => {
      this.ongoingTrainings = data;
    })
  }

  getUpcomingCourses() {
    this.jsonServer.getUpcomingCourses().subscribe (uData => {
      this.upcomingTrainings = uData;
    })
  }

  getCourseList() {
    this.showCourseList = true;
    this.jsonServer.getCourseList().subscribe(data => {
      this.data = data;
      this.courseCount = data.length;
      this.addCourseCount = 0;
    })
  }
  addCourse() {
    this.showAddCourse = true;
  }

  submitCourse(Title: HTMLInputElement, status: HTMLInputElement) {
    this.jsonServer.addCourse(Title.value, status.value).subscribe(data => {
      if (data != undefined) {

        alert("successfully added new course");
        this.showAddCourse = false;
        this.addCourseCount = 1;
        this.getTrainingStatus();
      }
    })
  }
}
