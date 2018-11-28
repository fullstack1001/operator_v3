import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/observable/interval';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	connection:true;
	messages = [];
	message = '';
  age:number;
  sub:any;
  targets  = [];
  showTarg = [];
  activity:any;
  targetsOnline:number;

  //sortedTargets = [];
  constructor(public navCtrl: NavController, private socket: Socket) {

     
    this.targetsOnline = 0;
  	this.getMessages().subscribe(message => {

  		this.messages.push(message);
  	})

   
  }

  getMessages(){
  	let observable = new Observable(observer => {

    
       this.socket.on('jsonrows', data => {
         this.activity = JSON.parse(data);
          //console.log(this.activity.target);

          // read the targets that are online from jsonrows
          let sortedTargets = [];
          for (var key in this.activity.target) {
            if (this.activity.target.hasOwnProperty(key)) {
              var obj = this.activity.target[key];
              for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                  if (prop == 'id' && this.activity.target[key]["online"])
                  { 
                    
                    sortedTargets.push(this.activity.target[key]['id']);

                  }  

              }
            }
          }
          // sort the targets
          sortedTargets.sort(function (a, b) {
            return a - b;
          });
          //console.log(sortedTargets);
          // display the targets that are online
          for (var i = 0; i < sortedTargets.length; i++) {
     
              this.showTarg[sortedTargets[i]] = true;
              
          }
          this.targets = sortedTargets;

          //console.log(this.targets);
          this.targetsOnline = this.targets.length;
        this.connection = true;
        observer.next(data);
        });
    

      this.socket.on('disconnect', function(){
        console.log("disconnected");
        this.connection = false;
 
  		  });
  	});
  	return observable;
  }
 

  discoverTargets() {
    
    console.log("event");
    this.socket.emit('discoverTargets', {text: 'nothing'});

  }

  flashTarget(val){
 
        console.log("pinging..." + val);

        this.socket.emit('pingTarget', val);

   }

}
