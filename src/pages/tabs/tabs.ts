import { Component } from '@angular/core';

import { RecomendPage } from '../recomend/recomend';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  HomeTable = HomePage;
  RecommendTable = RecomendPage;
  AboutTable = ContactPage;

  constructor() {

  }
}
