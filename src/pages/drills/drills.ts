import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/observable/interval';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the DrillsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-drills',
  templateUrl: 'drills.html',
})
export class DrillsPage {

  	messages = [];
  	message = '';
  	gameList:any;
  	showGameList:boolean;
  	showRefreshButton:boolean;
  	showSpeed:boolean;
  	set_speed:number;
	speed:any;
	matchtypes:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private socket: Socket,public alertCtrl: AlertController) {


  	  this.showGameList = false;
  	  this.showRefreshButton = false;
	 	// set a key/value
	  storage.set('name', 'Max');

	  // Or to get a key/value pair
	  storage.get('name').then((val) => {
	    console.log('Your age is', val);
	  });


	  // retrieve game list
	  this.socket.emit('gameTypes', {text: 'nothing'});


	  this.getMessages().subscribe(message => {

	  		this.messages.push(message);
	  	})

	  
 
/*	

	  $scope.game_types = angular.fromJson(data);
        $scope.game_types = $scope.game_types;
        $scope.radio_list = '';
        for (var i = 0; i < $scope.game_types.length; i++) {
          //if ($scope.game_types[i]['game_name'] == "Swarm")
            //$scope.game_types[i]['game_name'] = "Swarm - Beta";
          $scope.radio_list += '<ion-radio  ng-model="data.gamename" ng-value="\'' + $scope.game_types[i]['game_name'] + '\'">' + $scope.game_types[i]['game_name'] + '</ion-radio>';
        */  
  }




  getMessages(){
  	let observable = new Observable(observer => {

    
       this.socket.once('game_types', data => {
         console.log(JSON.parse(data)) ;
         this.gameList = JSON.parse(data);

         console.log(this.gameList[1]);
         this.showGameList = true;

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
    console.log('ionViewDidLoad DrillsPage');
  }

	add_game_to_view(val) {
	  	console.log("game clicked: " + val);
	  	this.showRefreshButton = true;
	  	this.showGameList = false;
	  	this.showSpeed = true;



	  	for (var j = 0; j < this.gameList.length; j++) {
            if (this.gameList[j]['game_type_id'] == val) {

            	console.log(this.gameList[j].game_name);
 				


                this.set_speed = 500;
                this.speed = [
                      {name: "100 ms", id: 100},
                      {name: "200 ms", id: 200},
                      {name: "300 ms", id: 300},
                      {name: "400 ms", id: 400},
                      {name: "500 ms", id: 500},
                      {name: "600 ms", id: 600},
                      {name: "700 ms", id: 700},
                      {name: "800 ms", id: 800},
                      {name: "900 ms", id: 900},
                      {name: "1 sec", id: 1000},
                      {name: "1.5 sec", id: 1500},
                      {name: "2 sec", id: 2000},
                      {name: "2.5 sec", id: 2500},
                      {name: "3 sec", id: 3000},
                      {name: "4 sec", id: 4000},
                      {name: "5 sec", id: 5000},
                      {name: "6 sec", id: 6000},
                      {name: "7 sec", id: 7000},
                      {name: "8 sec", id: 8000},
                      {name: "9 sec", id: 9000},
                      {name: "10 sec", id: 10000}
                    ];
                  this.matchtypes = [];
                  


            }
        }

	}

  doRefresh(){
  	this.showGameList = true;
  	this.showRefreshButton = false;
  }

  updateSpeed(val)
  {
  	console.log(val);
  }


  showAlert(val) {

  	if (val == 'speed')
  	{
  	  alert = this.alertCtrl.create({
      title: 'Speed',
      subTitle: 'Increase or decrease the time between activating targets. Reducing speed increases difficulty. ',
      buttons: ['OK']
    });
    alert.present();

  	}
    
  }


 
}
