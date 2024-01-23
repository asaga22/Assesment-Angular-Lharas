import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicListComponent } from './views/topic-list/topic-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TopicListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
