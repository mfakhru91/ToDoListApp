import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { PlusIcon } from '../../assets'
import { AddButtonProps } from './AddButtonProps'

const index = (porps:AddButtonProps) => {
  return (
    <TouchableOpacity
        {...porps}
        style={styles.activityAddButton}>
        <PlusIcon/>
        <Text style={styles.textActivityAddButton}>Tambah</Text>
    </TouchableOpacity>
  )
}

export default index

const styles = StyleSheet.create({
    activityAddButton:{
        paddingHorizontal:14,
        paddingVertical:13,
        backgroundColor:'#16ABF8',
        borderRadius:45,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
        textActivityAddButton:{
        fontFamily:'Poppins-Regular',
        fontSize:12,
        color:'#FFFFFF',
        fontWeight:'600',
        marginLeft:8.5
    },
})