
import React, { Component } from 'react';
import { AppRegistry, Alert, View, BackHandler, Text, Imageview, SafeAreaView, Image, TextInput,StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Header, Content, Item, Input, Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {GoogleSignin,GoogleSigninButton,statusCodes,} from 'react-native-google-signin';



class Secound extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      gettingLoginStatus: true,
    };
  }

  componentDidMount() {
    //initial configuration
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      webClientId: 'REPLACE_YOUR_WEB_CLIENT_ID_HERE',
    });
    //Check if user is already signed in
    this._isSignedIn();
  }
  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      //Get the User details as user is already signed in
      this._getCurrentUserInfo();
    } else {
      //alert("Please Login");
      console.log('Please Login');
    }
    this.setState({ gettingLoginStatus: false });
  };
  _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };
  _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };
  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null }); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <SafeAreaView>

        <View
          style={{ backgroundColor: '#fafafa', height: hp('100'), weight: wp('100') }}>

          <Image
            style={{ marginLeft: wp('23'), marginTop: hp('2') }}
            source={require('../assets/news.png')}></Image>

          <View style={{ height: hp('70'), weight: wp('70'), flexDirection: 'column' }}>

            <Text style={{ marginLeft: wp('9'), marginTop: hp('2'), fontSize: 20, color: '#9370DB' }}>Username</Text>
            <View style={{ height: hp('10'), width: wp('90'), flexDirection: 'row', }}>
              <Image
                style={{ marginLeft: wp('5'), marginTop: hp('2'),height:wp('5'),width:hp('2') }}
                source={require('../assets/lock.png')}></Image>

              <Container style={{ height: hp('10'), width: wp('10'), backgroundColor: '#fafafa' }}>
                <Item success>
                  <Input placeholder='Enter your Email' />
                  {/* <Icon name='checkmark-circle' /> */}
                </Item>
              </Container>
            </View>
            {/* for password Field */}
            <Text style={{ marginLeft: wp('9'), marginTop: hp('0'), fontSize: 20, color: '#9370DB' }}>Password</Text>
            <View style={{ height: hp('10'), width: wp('90'), flexDirection: 'row', }}>
              <Image
                style={{ marginLeft: wp('5'), marginTop: hp('2'),height:wp('5'),width:hp('2.5')  }}
                source={require('../assets/passwordrfinal.png')}></Image>

              <Container style={{ height: hp('10'), width: wp('10'), backgroundColor: '#fafafa' }}>
                <Item success>
                  <Input placeholder='Enter your Password' />
                  {/* <Icon name='checkmark-circle' /> */}
                </Item>
              </Container>
            </View>
            <View style={{marginBottom:hp('1')}}>
              <Text style={{marginLeft:wp('12'),color:'#9370DB',}}>Forgot Password !</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:wp('1')}}>
              <TouchableOpacity>
            <LinearGradient
            style={{height:hp('6'),width:wp('40'),borderRadius:hp('6'),marginLeft:wp('6'),flexDirection:'row'}}
            colors={['#d19fe4','#8dcaff']}>
              <Text style={{marginLeft:wp('14'),marginTop:hp('2'),color:'#ffffff'}}>Sign Up</Text>

            </LinearGradient>
            </TouchableOpacity> 
           <TouchableOpacity>
            <LinearGradient
            style={{height:hp('6'),width:wp('40'),borderRadius:hp('6'),marginLeft:wp('6'),flexDirection:'row'}}
            colors={['#d19fe4','#8dcaff']}>
              <Text style={{marginLeft:wp('14'),marginTop:hp('2'),color:'#ffffff'}}>Sign In</Text>
            </LinearGradient>
            </TouchableOpacity>
            </View>
            <Text style={{marginLeft:wp('10'),fontSize:18,marginTop:hp('2')}}>----------------------------------OR------------------------------------</Text>
            <View style={styles.container}>
            <GoogleSigninButton
              style={{ width: 290, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={this._signIn}
            />
          </View>
          </View>


        </View>




      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    marginTop:hp('1'),
    marginLeft:wp('16')
    
    
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
});


export default Secound;