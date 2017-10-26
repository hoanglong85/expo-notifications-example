import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import { WebBrowser, Notifications } from 'expo';

import { MonoText } from '../components/StyledText';

export default class NotificationsScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'You didn\'t set a title!',
      body: 'Why not enter text into the body?',
      data: {
        thisIsYourData: 'you left this empty'
      }
    }
    this._localNotification = this._localNotification.bind(this)
  }


  static navigationOptions = {
    // header: null,
    title: 'Notifications'
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <View style={styles.container}>
            <TextInput
              style={styles.textInput}
              placeholder={'title'}
              onChangeText={(text) => {this.setState({title: text})}}
            />

            <TextInput
              style={styles.textInput}
              placeholder={'body'}
              onChangeText={(text) => {this.setState({body: text})}}
            />

            <TextInput
              style={styles.textInput}
              placeholder={'data'}
              onChangeText={this._setDataValue}
            />

            <TouchableOpacity
              onPress={this._localNotification}
              style={styles.button}>
              <Text style={styles.text}>
                Open a local notification!
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    );
  }

  _setDataValue = (dataValue) => {
    console.log(dataValue)
    let data = this.state.data
    data.thisIsYourData = dataValue
    this.setState({data})
  }

  async _localNotification () {
    let notification = {
      title: this.state.title,
      body: this.state.body,
      data: this.state.data,
      ios: {
        sound: true
      },
      android: {
        sound: true
      }
    }
    let id = await Notifications.presentLocalNotificationAsync(notification)
    console.log(id)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  textInput: {
    height: 60,
    borderColor: '#000',
    borderWidth: 1,
    // padding: 15
  },
  button: {
    backgroundColor: '#2188FF',
    padding: 15
  },
  text: {
    alignItems: 'center'
  }
})