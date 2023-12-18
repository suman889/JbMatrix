import {
  View, Text, StyleSheet, TextInput, Dimensions,
  Pressable, Button, Platform, Alert, Progress, TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
const { height, width } = Dimensions.get('window')
import * as Clipboard from 'expo-clipboard';
import * as FileSystem from 'expo-file-system';
// import { Permissions } from 'expo';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';





const Downloads = () => {
  const url = 'https://app.screenzy.in/screenzyapp/uploads/3808571971701162224.mp4'
  const [copyText, setCopyText] = useState('');
  const [copied, setCopied] = useState(false);
  const [inputText, setInputText] = useState('');
  const [progress, setProgress] = useState(0);


  const requestStoragePermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status == 'granted') {
      console.log('Storage permission granted')
      return true; // Download cannot proceed without permission
    }
    Alert.alert('Downloading permissions require');
    return false; // Download can proceed
  };
  ////

  const downloadVideo = async (url, filePath) => {
    try {
      const downloadResumable = FileSystem.createDownloadResumable(url, filePath, {},false)
      const response = await downloadResumable.downloadAsync(null, { shouldCache: false });
      console.log('Video downloaded successfully:', response.uri);

      // save the media to the device
      const asset = await MediaLibrary.createAssetAsync(response.uri);
      console.log('download in my device ==', asset)

      //Show the Message with file location
      Alert.alert('Download Successful', `File saved to:${filePath}`)
    } catch (error) {
      console.error('Error downloading the video:', error);
    }
  };
  //////
  const handleDownload = async () => {
    // const videoUrl = 'https://app.screenzy.in/screenzyapp/uploads/3808571971701162224.mp4';

    if (inputText) {
      const videoUrl = `${inputText}`
      console.log('+++++>', videoUrl)
      const filePath = FileSystem.cacheDirectory + 'video.mp4';

      if (Platform.OS === 'android') {
        // const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

        // Request permission before downloading
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) return;

        // Call the download function if permission granted
        downloadVideo(videoUrl, filePath);
      }
    }else{
      Alert.alert('Enter The URL')
    }

  };


  //// Copy Functionality

  const copyToClipboard = async (url) => {
    try {
      // Get the URL text from the component
      Clipboard.setString(url)
      // Show success message (optional)
      Alert.alert('Copied to clipboard!');
    } catch (error) {
      console.error('Error copying text to clipboard:', error);
    }
  };

  /// input box

  const handleInputChange = (text) => {
    setInputText(text);

  };


  return (
    <View style={styles.container}>
      {progress > 0 && <Progress progress={progress / 100} />}
      <Text style={styles.text}>Enter the URL for download</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleInputChange}
        // value={inputText}
        placeholder="Enter URL.."
      // keyboardType="numeric"
      />

      <TouchableOpacity onPress={handleDownload}
        style={styles.button}>
        <Text style={styles.text}>Download..</Text>
      </TouchableOpacity>


      <View style={{
        width: width / 1.14,
        alignItems: 'center'
      }}>
        <Text style={{ ...styles.text, fontSize: 13, color: '#61dbfb', marginVertical: 10 }}>
          For Test this functionality you can copy the url and pest
        </Text>
        <Pressable onPress={() => copyToClipboard(url)}>
          <Text style={{ ...styles.text, fontSize: 13 }}>
            {url}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Downloads

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: width / 1.14,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    // marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2c2c30',
    marginTop: height / 4
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});