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
var DATA = new Array() ;
var array = [
   { name: 'Anh Cu Di Di.mp3',
      path: '/Users/cuongtt/Library/Developer/CoreSimulator/Devices/4483BD97-9EA3-4180-B6CB-87F9BC210328/data/Containers/Bundle/Application/935B6F90-DE05-4803-890C-FC13C5932D3D/Test.app/mp3files/Anh Cu Di Di.mp3',
      size: 4013391,
      isFile: [Function: isFile],
      isDirectory: [Function: isDirectory] },
    { name: 'Guong Mat la Lam.mp3',
      path: '/Users/cuongtt/Library/Developer/CoreSimulator/Devices/4483BD97-9EA3-4180-B6CB-87F9BC210328/data/Containers/Bundle/Application/935B6F90-DE05-4803-890C-FC13C5932D3D/Test.app/mp3files/Guong Mat la Lam.mp3',
      size: 5349075,
      isFile: [Function: isFile],
      isDirectory: [Function: isDirectory] },
    { name: 'Hay Ra Khoi Nguoi Do Di.mp3',
      path: '/Users/cuongtt/Library/Developer/CoreSimulator/Devices/4483BD97-9EA3-4180-B6CB-87F9BC210328/data/Containers/Bundle/Application/935B6F90-DE05-4803-890C-FC13C5932D3D/Test.app/mp3files/Hay Ra Khoi Nguoi Do Di.mp3',
      size: 3045871,
      isFile: [Function: isFile],
      isDirectory: [Function: isDirectory] },
    { name: 'Nhu Phut Ban Dau.mp3',
      path: '/Users/cuongtt/Library/Developer/CoreSimulator/Devices/4483BD97-9EA3-4180-B6CB-87F9BC210328/data/Containers/Bundle/Application/935B6F90-DE05-4803-890C-FC13C5932D3D/Test.app/mp3files/Nhu Phut Ban Dau.mp3',
      size: 4056745,
      isFile: [Function: isFile],
      isDirectory: [Function: isDirectory] },
    { name: 'Xin Em.mp3',
      path: '/Users/cuongtt/Library/Developer/CoreSimulator/Devices/4483BD97-9EA3-4180-B6CB-87F9BC210328/data/Containers/Bundle/Application/935B6F90-DE05-4803-890C-FC13C5932D3D/Test.app/mp3files/Xin Em.mp3',
      size: 5187743,
      isFile: [Function: isFile],
      isDirectory: [Function: isDirectory] }
];
var test = "test";

class Test extends Component {
  playSound(){
    mp3.play();
  }

  pauseSound(){
    mp3.pause();
  }

  renderRows(property){
    return(
      <View style={styles.rows}>
        <Text>{property.name}</Text>
      </View>
    );
  }

  checkDATA(callback){
    RNFS.readDir(RNFS.MainBundlePath + '/mp3files')
    .then((result) => {
      // Load file and push into array DATA

      for (var i = 0; i < result.length; i++) {
        DATA.push(result[i]);
      }
      console.log();
      //callback(this,DATA);
      callback(DATA);
      //return DATA;
    })
    .catch((err) => {
      console.log(err.message, err.code);
      return false;
    });
  }


  constructor(props){
    super(props);
    this.state = { dataSource : new ListView.DataSource({ rowHasChanged:(r1,r2) => r1 != r2 })};
    /*var ds = new ListView.DataSource({ rowHasChanged:(r1,r2) => r1 != r2 });
    this.state = {
      dataList: ds.cloneWithRows(array)
    };*/

    this.checkDATA(function(m_DATA){

        console.log('DATA1',m_DATA);

        this.setState({
          dataList:this.state.dataSource.cloneWithRows(m_DATA)
        });

     });


    /*var ds = new ListView.DataSource({ rowHasChanged:(r1,r2) => r1 != r2 });
    this.state={
      dataList : ds.cloneWithRows(this.checkDATA())
    };*/

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.listView}>
          <ListView
            dataSource={this.state.dataList}
            renderRow={this.renderRows}
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
