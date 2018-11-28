import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/observable/interval';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  messages = [];
  message = '';
  activity:any;
  idleBlink:boolean;
  speedStart:boolean;
  brightness:number;
  sensitivity:number;
  resetTargetsMsg:any;
  deleteTargetMsg:string;
  restartBasestationMsg:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {

  	this.idleBlink = false;
  	this.speedStart = false;
  	this.resetTargetsMsg = '';
  	this.deleteTargetMsg = '';
  	this.restartBasestationMsg = '';
  	this.getMessages().subscribe(message => {
  		this.messages.push(message);
  	})

  }

  getMessages(){

  	let observable = new Observable(observer => {

  		// read data coming from basestation
        this.socket.on('jsonrows', data => {

         	this.activity = JSON.parse(data);
         	//console.log(this.activity);
    		this.idleBlink = this.activity.idle_blink;
    		this.speedStart = this.activity.speed_start;
    		this.sensitivity = this.activity.lumatic_hit_sensitivity;
    		//console.log(this.activity.lumatic_hit_sensitivity);
    		this.brightness = parseInt(this.activity.led_brightness,16);

        	observer.next(data);
        });

        this.socket.on('incoming', data => {
        	console.log("Incoming!!!");
        	console.log(data);
         	this.activity = JSON.parse(data);
          
 

        	observer.next(data);
        });
    
        this.socket.on('disconnect', function(){
        	console.log("disconnected");
        	this.connection = false;
 
  		});

  	});
  	return observable;
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  toggle_idle_blink(val){

  	this.socket.emit('idleBlink', val);
  	console.log("idle blink value: " +  val);

  }


  set_brightness(val){
 
  	console.log("base 10: " +  val);
  	this.socket.emit('brightness', val.toString(16));
  }


  set_hit_sensitivity(val){
 
  	console.log("sensitivity: " +  val);
  	this.socket.emit('sensitivity', val);

  }

  toggle_speed_start(val){

  	this.socket.emit('speedStart', val);
  	console.log("speed start value: " +  val);

  }

  reset_targets(){
  	this.socket.emit('resetTargets', true);
  	this.resetTargetsMsg = "Targets reset";
  	setTimeout(function(){
  	 	this.resetTargetsMsg = "";
  	 },3000);
  	console.log("resetting targets");
  }

  delete_target_list(){
  	this.deleteTargetMsg = "Target list deleted";
  	setTimeout(function(){
  	 	this.deleteTargetMsg = "";
  	 },3000);
  	this.socket.emit('deleteTargetList', true);
  	console.log("deleting target list");
  }

  restart_basestation(){
  	this.restartBasestationMsg = "Basestation restarting...";
  	 this.socket.emit('restartBasestation', true);	
  	 setTimeout(function(){
  	 	this.restartBasestationMsg = "";
  	 	this.navCtrl.parent.select(0);

  	 },3000);
  	
  	console.log("restarting basestation" );
  }
}
