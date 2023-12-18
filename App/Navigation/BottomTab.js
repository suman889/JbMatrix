import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@expo/vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
const { height, width } = Dimensions.get('window');

//Screen
import { Home, Download, VedioPlayer } from '../Pages'


const Bottomtab = () => {
    return (
        <Tab.Navigator

            // tabBarOptions={{
            //     keyboardHidesTabBar: true
            // }}
            screenOptions={{
                "tabBarHideOnKeyboard": true,
                tabBarActiveTintColor: '#fff',
                tabBarShowLabel: true,
                headerShown: false,
                //tabBarInactiveTintColor: COLORS.secondaryFontColor,
                tabBarStyle: {
                    backgroundColor: '#2c2c30',
                    height: 55,
                    paddingBottom: 5,


                },
                // tabStyle: {
                //     paddingVertical: 5,
                //     paddingHorizontal:10,
                //     marginHorizontal:10
                // }


            }}
        >

            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size, }) => {
                        return <Icon
                            name='home'
                            type='AntDesign'
                            color={color}
                            size={18}
                        />

                    },

                    tabBarLabelStyle: {
                        fontWeight:800,
                        fontSize: 13,
                        color:'#61dbfb',
                    },
                }}
            />

            <Tab.Screen
                name="Download"
                component={Download}
                options={{
                    tabBarIcon: ({ color, size, }) => {

                        return (
                            <Icon
                                name='download'
                                type='AntDesign'
                                color={color}
                                size={18}
                            />
                        )


                    },

                    tabBarLabelStyle: {
                        fontWeight:800,
                        fontSize: 13,
                        color:'#61dbfb',
                    },
                }}
            />

            <Tab.Screen
                name="VedioPlayer"
                component={VedioPlayer}
                options={{
                    tabBarIcon: ({ color, size, }) => {
                        return <Icon
                            name='md-duplicate-outline'
                            type='Ionicons'
                            color={color}
                            size={18}
                        />

                    },

                    tabBarLabelStyle: {
                        fontWeight:800,
                        fontSize: 13,
                        color:'#61dbfb',
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default Bottomtab