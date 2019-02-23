import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { SettingsResolver } from './settings.resolver';
import { AuthGuard } from './auth-guard.service';

const routes = [
  {
    path: '',
    component: SettingsComponent,
    canLoad: [AuthGuard],
    resolve: {
      settings: SettingsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
