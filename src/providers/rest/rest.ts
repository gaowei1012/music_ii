import { LoadingController, AlertController, ToastController } from 'ionic-angular';

import {Injectable } from '@angular/core';
import {Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class Global {
  /**
   *  接口基地
   */
  static BASEURL : 'http://118.126.113.19:3000';

  static API: any = {
    getHot: '/search/hot', // 获取热搜
    getSilder: '/banner', // 获取轮播图
    getSongs: '/song/detail' // 获取歌词

  };
  static LIMIT = 10;
}

@Injectable()
export class RestProvider {

  constructor(public http: Http,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController
              ) { }


  /**
   *  get请求方法封装
   * @param url
   * @param params
   * @param {boolean} loader
   */
  public httpGet( url, params, loader: boolean = false ) {
    let loading = this.loadingCtrl.create({}); // 创建loding
    if (loader) { // 这里刷新loading
      loading.present();
    }

    // 返回数据
    return this.http.get(Global.BASEURL + url + this.encode(params))
      .toPromise()
      .then(res => {
        let d = res.json();
        if (loader) {
          loading.dismiss(); // 关闭loading
        }
        return d;
      })
      .catch(error=> {
        if (loader) {
          loading.dismiss(); // 关闭loading
        }
        this.handleError(error)
      })

  }

  /**
   * 校验
   * @param params
   */
  encode(params) {
    var str = '';
    if (params) {
      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          var value = params[key];
          str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
        }
      }
      str = '?' + str.substring(0, str.length - 1);
    }
    return str;
  }

  /**
   * 异常捕获处理
   * @param error
   */
  private handleError(error) {
    let msg = '';
    if (error.status == 400) {
      msg = '请求无效(code：404)';
      console.log('请检查参数类型是否匹配');
    }
    if (error.status == 404) {
      msg = '请求资源不存在(code：404)';
      console.error(msg + '，请检查路径是否正确');
    }
    if (error.status == 500) {
      msg = '服务器发生错误(code：500)';
      console.error(msg + '，请检查路径是否正确');
    }
    console.log(error);
    if (msg != '') {
      this.toast(msg);
    }
  }

  /**
   * toats
   * @param msg
   */
  toast(msg) {

  }

}
