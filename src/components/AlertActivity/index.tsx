import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { AlertActivityProps,ToastHandler } from './AlertActivityProps'
import { ModalInformationIcon } from '../../assets'

const index = forwardRef<ToastHandler,AlertActivityProps>(
  (props,ref)=>{
    const {duration = 3000} = props
    const [visible, setVisible] = useState(true)
    const [title, setTitle] = useState('')

    useImperativeHandle(ref,()=>({
      setModalVisible:(title)=>{
        setVisible(true)
        setTitle(title)
      },
    }))

    useEffect(() => {
      if (visible) {
        setTimeout(() => {
          setVisible(false)
        }, duration);
      }
    }, [visible])

    return(
      visible ? (
        <TouchableOpacity
          onPress={()=>setVisible(false)}
          style={styles.container}>
          <ModalInformationIcon accessibilityLabel={'modal-information-icon'}/>
          <Text style={styles.modalInformationTitle} accessibilityLabel='modal-information-title'>{title}</Text>
        </TouchableOpacity>
      ):null
    )
})

export default index

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FFFFFF',
        margin:19,
        paddingVertical:19,
        paddingHorizontal:30,
        alignItems:'center',
        flexDirection:'row',
        borderRadius:12,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        position:'absolute',
        top:0,
        right:0,
        left:0,
    },
    modalInformationTitle:{
      fontFamily:'Poppins-Regular',
      fontWeight:'500',
      fontSize:14,
      marginLeft:13,
      color:'#111111'
    }
})