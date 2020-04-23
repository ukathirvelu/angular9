import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  private dashboardUrl = 'http://localhost:3200/dashboard';
  private teamMemberUrl = 'http://localhost:3200/TeamMembers';
  private viewTraininsUrl = 'http://localhost:3200/ViewTrings';
  private topicsUrl = 'http://localhost:3200/TringTopics'

  constructor(private httpService: HttpClient) { }

  getCourseList(): Observable<any> {

    return this.httpService.get<any>(this.dashboardUrl);
  }

  addCourse(title: string, status: string): Observable<any> {

    return this.httpService.post<any>(this.dashboardUrl, { title: title, status: status });
  }

  getOngoingCourses(): Observable<any> {

    const url = 'http://localhost:3200/OngoingTrainings';
    return this.httpService.get<any>(url);
  }

  getUpcomingCourses(): Observable<any> {

    const url = 'http://localhost:3200/UpcomingTrainings';
    return this.httpService.get<any>(url);
  }

  getTeamMebers(): Observable<any> {

    return this.httpService.get<any>(this.teamMemberUrl);
  }

  updateTeamMember(id: number, firstName: string, lastName: string, phone: string, email: string): Observable<any> {

    if (id != -1) {
      return this.httpService.put<any>(this.teamMemberUrl + "/" + id, { firstName: firstName, lastName: lastName, phone: phone, email: email });
    } else {
      return this.httpService.post<any>(this.teamMemberUrl, { firstName: firstName, lastName: lastName, phone: phone, email: email });
    }
  }

  fetchViewTrainings() {
    return this.httpService.get<any>(this.viewTraininsUrl);
  }

  updateTraining(id: number, trainingName: string, topic: string, startDate: string, endDate: string): Observable<any> {

    if (id != -1) {
      return this.httpService.put<any>(this.viewTraininsUrl + "/" + id, { trainingName: trainingName, topic: topic, startDate: startDate, endDate: endDate });
    } else {
      return this.httpService.post<any>(this.viewTraininsUrl, { trainingName: trainingName, topic: topic, startDate: startDate, endDate: endDate });
    }
  }

  fetchTopics() {
    return this.httpService.get<any>(this.topicsUrl);
  }

  updateTopic(id: number, topicName: string, description: string, startDate: string, endDate: string): Observable<any> {

    if (id != -1) {
      return this.httpService.put<any>(this.topicsUrl + "/" + id, { topicName: topicName, description: description, startDate: startDate, endDate: endDate });
    } else {
      return this.httpService.post<any>(this.topicsUrl, { topicName: topicName, description: description, startDate: startDate, endDate: endDate });
    }
  }
}
