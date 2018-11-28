import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrillsPage } from './drills';

@NgModule({
  declarations: [
    DrillsPage,
  ],
  imports: [
    IonicPageModule.forChild(DrillsPage),
  ],
})
export class DrillsPageModule {}
