/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,TouchableOpacity,ListView
} from 'react-native';
var Sound = require('react-native-sound');
var RNFS = require('react-native-fs');

var mp3 = new Sound('mp3files/Guong Mat la Lam.mp3',Sound.MAIN_BUNDLE,(error)=>{
  if(error){
    console.log('Ko load dc nhac', error);
  } else {
    console.log('Load dc nhac roi');
  }
});

var DATA = [];
var array = [
  {ten:'Nguyen Van A'},
  {ten:'Nguyen Van A'},
  {ten:'Nguyen Van A'},
  {ten:'Nguyen Van A'},
  {ten:'Nguyen Van A'},
  {ten:'Nguyen Van A'},
  {ten:'Nguyen Van A'},
  {ten:'Nguyen Van A'},
  {ten:'Nguyen Van A'},
  {ten:'Nguyen Van A'}
];

class Test extends Component {
  playSound(){
    mp3.play();
  }

  pauseSound(){
    mp3.pause();
  }

  createRows(property){
    console.log('createRows' ,property.name);
    return(
      <View style={styles.rows}>
        <Text>{property.name}</Text>
      </View>
    );
  }

  constructor(props){
    super(props);

    RNFS.readDir(RNFS.MainBundlePath + '/mp3files')
    .then((result) => {
      // Load file and push into array DATA

      for (var i = 0; i < result.length; i++) {

        DATA.push(result[i]);
      }
      console.log('DATA', DATA);
  //    return Promise.all([RNFS.stat(result[0].name), result[0].name]);
  
      return DATA;
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });

    var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2});
    this.state = {
      dataList : dataSource.cloneWithRows(DATA)
    };

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.listView}>
          <ListView
            dataSource={this.state.dataList}
            renderRow={this.createRows}
          />
        </View>

        <View style={styles.button}>
          <TouchableOpacity onPress={this.playSound}>
            <Text style={styles.welcome}>
              Play
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.pauseSound}>
            <Text style={styles.welcome}>
              Pause
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rows:{
    backgroundColor:'green'
  },
  listView:{
    flex:1,
  },
  button:{
    flex:1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    backgroundColor:'grey'
  },

});

AppRegistry.registerComponent('Test', () => Test);
