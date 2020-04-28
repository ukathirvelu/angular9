import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamMembersService } from 'src/app/team-members.service';
import { Router } from '@angular/router';
import { Lookup } from 'src/app/model/teamMember.model';
import { TrainingPageService } from 'src/app/training-page.service';
import { MemberTrainingMap } from 'src/app/model/memberTrainingMapping.model';
import { UpcomingTrainings } from 'src/app/model/upcomingTrainings.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  step = 0;
  //data = new Array<any>();
  //temp = new Array<any>();
  course = new Array<any>();
  //memberList: Array<string> = [];
  //upcomingTrainings  = new Array<any>();
  totalTrainings;
  upcomingTrainings;
  ongoingTrainings;

  angularList = [];
  microserviceList = [];
  upcomingTrainingsMap;
  ongoingTrainingsMap;
  trainingAngular;
  trainingMicroservice;
  staticList;
  staticTable = new Set();
  upcomingTrain: UpcomingTrainings;

  tempTrainingMap;
  //microserviceTopics = ['Monolithic','ServiceDiscovery','Hysterix','CircuitBreaker','LoadBalance'];
  topicNames;
  angularCount = 0;
  microserviceCount = 0;
  totalTrainingMap;
  setStep(index: number) {
    this.step = index;
    if (index == 10) {
      this.getOngoingCourses();
    } else if (index == 11) {
      this.getUpcomingCourses();
    }

  }
  getUpcomingCourses() {
    this.teamMembersService.getUpcomingCourses().subscribe(data => {
      let upcomingMap = new Map();

      data.forEach(element => {
        if (upcomingMap.get(element.trainingName) == null) {
          let tmp = new Array<any>();
          tmp.push(element);
          upcomingMap.set(element.trainingName, tmp);
        }
        else {
          let tmpOld = upcomingMap.get(element.trainingName);
          tmpOld.push(element);
          upcomingMap.set(element.trainingName, tmpOld);
        }

        //console.log("trainingName -->" + element.trainingName);
      });

      this.upcomingTrainings = upcomingMap;
      //onsole.log("UpcomingCourses-->" + this.upcomingTrainings);

      // upcomingMap.forEach((value: any[], key: string) => {
      //   console.log("Key Value--->" + key, value);
      // });
    });
  }

  getOngoingCourses() {
    this.teamMembersService.getOngoingCourses().subscribe(data => {
      //console.log("OngoingCourses-->" + data);

      let upcomingMap = new Map();

      data.forEach(element => {
        if (upcomingMap.get(element.trainingName) == null) {
          let tmp = new Array<any>();
          tmp.push(element);
          upcomingMap.set(element.trainingName, tmp);
        }
        else {
          let tmpOld = upcomingMap.get(element.trainingName);
          tmpOld.push(element);
          upcomingMap.set(element.trainingName, tmpOld);
        }

        // console.log("trainingName -->" + element.trainingName);
      });

      this.ongoingTrainings = upcomingMap;
      // console.log("OngoingCourses-->" + this.ongoingTrainings);

      // upcomingMap.forEach((value: any[], key: string) => {
      //   //console.log("Key Value--->" + key, value);
      //   console.log(value[0].startDate);
      // });



    });
  }



  navPageTwo(): void {
    this.route.navigate(['secondPage']);
  }

  navPageThird(): void {
    this.route.navigate(['thirdPage']);
  }

  navPageForth(): void {
    this.route.navigate(['forthPage']);
  }


  constructor(private teamMembersService: TeamMembersService, private trainingPageService: TrainingPageService, private route: Router) { }

  ngOnInit() {

    this.trainingPageService.getTrainingDetails().subscribe(data => {
      // console.log('upcomingTrainings-->' + data);
      this.totalTrainings = data;
    });

    let tmpMap = new Map();
    this.totalTrainingMap = new Map();
    this.trainingPageService.getOngoingTrainingDetails().subscribe(data => {
      this.totalTrainings = this.totalTrainings.concat(data);
      // console.log(this.totalTrainings);
      this.totalTrainings.forEach(element => {

        var strtDate = new Date(element.startDate);
        var curr = new Date();
        if (tmpMap.get(element.trainingName) == null) {

          if (strtDate.getMonth() == curr.getMonth()) {
            let tmp = new Array<any>();
            tmp.push(element);
            tmpMap.set(element.trainingName, tmp);
          }
        }
        else {
          if (strtDate.getMonth() == curr.getMonth()) {
            let tmpOld = tmpMap.get(element.trainingName);
            tmpOld.push(element);
            tmpMap.set(element.trainingName, tmpOld);
          }
        }

        // console.log("trainingName -->" + element.trainingName);
        this.totalTrainingMap = tmpMap;
      });

      let staticList = new Set<UpcomingTrainings>();
      // let counttraining =0;
      this.totalTrainingMap.forEach((value: any[], key: string) => {

        this.upcomingTrain = new UpcomingTrainings();
        this.upcomingTrain.trainingName = key;
        var endDate = new Date(value[0].endDate);
        var startDate = new Date(value[0].startDate);
        var curDate = new Date();
        if (endDate.getDate() < curDate.getDate()) {
          this.upcomingTrain.progress = "Completed";
          this.upcomingTrain.percentage = 100;
          // counttraining++;
        } else if (startDate.getDate() > curDate.getDate()) {
          this.upcomingTrain.progress = "Yet to start";
          this.upcomingTrain.percentage = 0;
          //counttraining++;
        } else {
          this.upcomingTrain.progress = "InProgress";
           var pert;
          var startday = new Date(value[0].startDate).valueOf();
          var endDay = new Date(value[0].endDate).valueOf();
          pert = ((new Date().valueOf() - startday)/(endDay - startday))*100;
          //console.log(pert.toFixed());
          this.upcomingTrain.percentage = pert.toFixed();
          // counttraining++;
        }

        staticList.add(this.upcomingTrain);
        //staticList.add(value[0].startDate);
        //console.log(key ,value[0].startDate);

      });

      staticList.forEach(ele=>{
        //console.log(ele.trainingName,ele.progress);
        this.staticTable.add(ele);
      });

      
    

    });

    console.log(this.staticTable);




    this.teamMembersService.getMemberMapTraining().subscribe(data => {
      //console.log(data);

      let upcomingMap = new Map();
      let ongoingMap = new Map();
      data.forEach(element => {

        if (upcomingMap.get(element.upcomingTrainings) == null) {
          let tmp = new Array<any>();
          tmp.push(element);
          upcomingMap.set(element.upcomingTrainings, tmp);
        }
        else {
          let tmpOld = upcomingMap.get(element.upcomingTrainings);
          tmpOld.push(element);
          const result = Array.from(tmpOld.reduce((m, t) => m.set(t.teamMembers, t), new Map()).values());
          
          upcomingMap.set(element.upcomingTrainings, result);
        }

        if (ongoingMap.get(element.ongoingTrainings) == null) {
          let ongoingtmp = new Array<any>();
          ongoingtmp.push(element);
          ongoingMap.set(element.ongoingTrainings, ongoingtmp);
        }
        else {
          let ongoingtmpOld = ongoingMap.get(element.ongoingTrainings);
          ongoingtmpOld.push(element);
          const result = Array.from(ongoingtmpOld.reduce((m, t) => m.set(t.teamMembers, t), new Map()).values());
          ongoingMap.set(element.ongoingTrainings, result);
        }

        //console.log("upcomingTrainings -->" + element.upcomingTrainings);
        //console.log("ongoingTrainings -->" + element.ongoingTrainings);

      });

      this.upcomingTrainingsMap = upcomingMap;
      this.ongoingTrainingsMap = ongoingMap;
      // console.log("UpcomingCourses-->" + this.upcomingTrainingsMap);

      //  ongoingMap.forEach((value: any[], key: string) => {
      //    console.log(key, value);
      //  });

    });
  }



}