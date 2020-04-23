import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingTopicsComponent } from './childs/training-topics/training-topics.component';
import { ViewTrainingComponent } from './childs/view-training/view-training.component';
import { TeamMembersComponent } from './childs/team-members/team-members.component';
import { ExpansionOverviewExample } from './expansion-overview-example';


const routes: Routes = [
  { path: 'homePage', redirectTo: '' },
  { path: 'trainingTopics', component: TrainingTopicsComponent },
  { path: 'viewTraining',      component: ViewTrainingComponent },
  { path: 'viewTeamMembers',      component: TeamMembersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
