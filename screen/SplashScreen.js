import React, { Component } from 'react';
import { Text, SafeAreaView, View, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Home from './Home';
// import {}  from 'native-base';

class SplashScreen extends Component {

static navigationOption={
    header:null
}

componentWillMount()
{
    setInterval(()=>{this.props.navigation.navigate('Secound')},5000)
}

 


render(){
    return (

        <SafeAreaView>

            <View    style={styles.liner} >
          

               
                    
                    <Image
                        style={{ height: wp('60'), width: hp('30'), marginTop: hp('24'), marginLeft: wp('25') }}
                        source={require('../assets/news.png')}
                    ></Image>

               



            </View>
        </SafeAreaView>


    );

}
}

const styles = StyleSheet.create({

    liner: {
        flex:1,
        flexDirection:'row',
        height: wp(100),
        width: hp(100)
    }



});

export default SplashScreen;