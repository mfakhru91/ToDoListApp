import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationParamsList } from './navigationParamsList'
import * as Screens from '../screens'
const Stack =  createStackNavigator<NavigationParamsList>()

const Routes = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle:styles.HeaderStyle,
                headerTitleStyle:styles.HeaderTitleStyle
            }}>
            <Stack.Screen 
                name="DashboardScreen" 
                component={Screens.DashboardScreen} 
                options={{
                    title:'TO DO LIST APP'
                }}/>
            <Stack.Screen 
                name="ItemListScreen" 
                component={Screens.ItemListScreen} 
                options={{
                    title:'NEW ACTIVITY'
                }}/>
        </Stack.Navigator>
    )
}

export default Routes

const styles = StyleSheet.create({
    HeaderStyle:{
        backgroundColor:'#16ABF8',
        height:64
    },
    HeaderTitleStyle:{
        color:'#FFFFFF',
        fontFamily:'Poppins-Regular',
        fontWeight:'700',
        fontSize:18
    }
})