import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { DrillsPage } from '../drills/drills';
import { ScoresPage } from '../scores/scores';
import { SettingsPage } from '../settings/settings';
import { ProfilesPage } from '../profiles/profiles';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = DrillsPage;
  tab4Root = ScoresPage;
  tab5Root = SettingsPage;
  tab6Root = ProfilesPage;

  constructor() {

  }
}
