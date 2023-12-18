import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Home from './App/Pages/Home.jsx'
import Bottomtab from './App/Navigation/BottomTab.js';

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
   
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator> */}
      <Bottomtab/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
