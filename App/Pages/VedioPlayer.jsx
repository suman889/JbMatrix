import { View, Text, StyleSheet, Dimensions, Button, ActivityIndicator } from 'react-native'
import React from 'react'
import { ResizeMode } from 'expo-av'
import { Video } from 'expo-av';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const { height, width } = Dimensions.get('window')
import axios from 'axios';
//
const BASE_URL = "https://app.screenzy.in/screenzyapp/api/";
const FUNCTION = "fetch_video_tab_group_wise";

const VedioPlayer = ({ navigation, route, }) => {
  // const video = React.useRef(null);

  const [loading, setLoading] = React.useState(true)
  const [singleVideo, setSingleVideo] = React.useState([])

  const id = route?.params?.featuredPostId;
  // console.log('====>', id)


  ///Loding the specific vedio

  const url = `${BASE_URL}${FUNCTION}`;

  React.useEffect(() => {
    factchPost();

  }, []);



  const factchPost = async () => {
    try {

      const response = await axios.post(url,
        {
          tab_group_id: 13
        },
        {
          headers: {
            'Keydata': '435643653467655',
            "Content-type": "multipart/form-data"
          }
        })
      const videoData = response.data.data; // Access the data from the response
      // Use the videoData in your application
      setSingleVideo(videoData);
      // console.log("Success:", videoData);
      setLoading(false);

    } catch (error) {
      console.log("Error:", error);
    }
  }


  //For match api id with which id passes through params
  const viewVideo = singleVideo.find((element) => {
    return id === element.id;
  });
  // console.log('=======@@@$$$$**', selectedVideoInfo);
  const videoEndpoint = viewVideo?.video;
  // console.log('urlend====***>', videoEndpoint);



  //////////////////////======\\\\\\\\\
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Focus');
      //Every time the screen is focused the Video starts playing
      if (this.video) {
        this.video.playAsync();
      }
    });

    return unsubscribe;
  }, [navigation]);

  //Blur Event: to be fired when the VideoScreen loses focus.
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      console.log('Blur');
      //Every time the screen loses focus the Video is paused
      if (this.video) {
        this.video.pauseAsync();
      }
    });

    return unsubscribe;
  }, [navigation]);

  //////////////////////======\\\\\\\\\


  return (
    <View style={styles.container}>

      {loading ? <Text style={{ color: '#fff', alignSelf: 'center', }}>
        <ActivityIndicator />
        Loading...
      </Text> :
        <Video
          ref={ref => { this.video = ref }}
          source={{ uri: `https://app.screenzy.in/screenzyapp/${videoEndpoint}` }}
          // source={{ uri: 'https://app.screenzy.in/screenzyapp/uploads/3808571971701162224.mp4' }}

          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay={true}
          useNativeControls={true}
          style={styles.video}
        />


      }
    </View>
  )
}

export default VedioPlayer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch'
  },

});