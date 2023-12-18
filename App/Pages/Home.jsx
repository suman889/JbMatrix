import React, { useState, useEffect } from 'react'
import {
    StyleSheet, Text, View, ScrollView, FlatList,
    Dimensions, Image, Pressable, Button
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
const { height, width } = Dimensions.get('window')
import axios from 'axios';
const BASE_URL = "https://app.screenzy.in/screenzyapp/api/";
const VIDEO_URL = "https://app.screenzy.in/screenzyapp/"
const KEY_DATA = "435643653467655";
const FUNCTION = "fetch_video_tab_group_wise";
// import VideoPlayer from '../Component/VideoPlayer.jsx'
import { ResizeMode } from 'expo-av'
import { NavigationContainer } from '@react-navigation/native';



const Home = ({ navigation }) => {
    const [data, setDate] = useState([])
    const [loading, setLoading] = useState(false)



    const url = `${BASE_URL}${FUNCTION}`;

    useEffect(() => {
        factchPost();
    }, []);



    const factchPost = async () => {
        try {
            setLoading(true)
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
            setDate(videoData);
            // console.log("Success:", videoData);
            setLoading(false)

        } catch (error) {
            console.log("Error:", error);
        }
    }


    return (
        <>
            <StatusBar style="light" />
            {
                loading ?
                    <View style={{}
                    } >
                        <Text style={{ color: '#fff', alignSelf: 'center' }}>Loading...</Text>
                    </View > :


                    <View style={{ flex: 1, backgroundColor: '#000' }}>
                        <View style={{ height: 50 }} />

                        <View style={{
                            width: width,
                            // alignSelf: 'center',
                            // flexWrap:'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            //   paddingBottom:10
                            // backgroundColor: 'green',
                            height: height / 1.12
                        }}>
                            <FlatList
                                data={data}

                                numColumns={2}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => {
                                    return (
                                        <Pressable
                                            onPress={() =>
                                                navigation.navigate('VedioPlayer', { featuredPostId: item.id })
                                            }
                                            style={{
                                                height: height / 4, width: width / 2.4,
                                                borderRadius: 5, borderWidth: 1,
                                                backgroundColor: '#3d3d41', shadowColor: "#edf6ff",
                                                shadowOpacity: 0.5,
                                                // alignItems: 'center',
                                                // justifyContent: 'center',
                                                marginHorizontal: 4,
                                                marginVertical: 4

                                            }}>
                                            <View style={{
                                                width: '100%', height: 114,

                                                //  backgroundColor: 'green',


                                            }}>

                                                <Image source={require('../../assets/React.jpg')}
                                                    style={{ width: '100%', height: 113, resizeMode: 'cover', borderRadius: 4, }}
                                                />


                                            </View>
                                            <View style={{ marginLeft: 6, marginTop: 5 }}>
                                                <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold', }}>{item.title ? item.title : 'JB Matrix'}</Text>
                                                <Text style={{ color: '#fff', fontSize: 12 }}>{item.company_name}</Text>
                                            </View>
                                        </Pressable>
                                    )
                                }}
                            />

                            {/* <Button
                                title="Go to Jane's profile"
                                onPress={() =>
                                    navigation.navigate('VedioPlayer', { name: 'Jane' })
                                }
                                style={{ height: 100, width: 400, backgroundColor: 'green', marginBottom: 10, }}
                            /> */}

                        </View>



                    </View>





            }
        </>
    )
}

export default Home