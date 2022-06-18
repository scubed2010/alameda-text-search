import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { TextSearchComponent } from './components/text-search/text-search.component';

const routes: Routes = [
  { path: 'TextSearch', component: TextSearchComponent },
  { path: "**", component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
