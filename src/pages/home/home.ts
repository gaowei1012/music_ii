import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider, Global } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // 定义原始数据类型
  private silders = [];

  constructor(public navCtrl: NavController,
              public rest: RestProvider) {

  }

  ngOnInit() {

  }

  private getSilders() {
    this.rest.httpGet(Global.API.getSilder)
    

}
