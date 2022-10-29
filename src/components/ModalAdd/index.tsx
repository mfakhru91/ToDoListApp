import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ModalAddProps } from './ModalAddProps'
import { CloseIcon } from '../../assets'
import { TextInput } from 'react-native-gesture-handler'
const {width,height} = Dimensions.get('window')
const index = (props:ModalAddProps) => {
  return (
    <Modal
        {...props}>
      <View style={styles.modalContainer}>
        <View style={styles.cardContainer}>
            <View style={styles.modalHeaderContainer}>
                <Text style={styles.modalAddTitle}>{props.type == 'add'?'Tambah':'Update'} List Item</Text>
                <TouchableOpacity
                    onPress={props.onClose}>
                    <CloseIcon/>
                </TouchableOpacity>
            </View>
            <View style={styles.modalBodyContainer}>
                <View>
                    <Text style={styles.inputLabel}>NAMA LIST ITEM</Text>
                    <TextInput 
                        style={styles.textInputStyle}
                        placeholder='Tambahkan nama list item'/>
                </View>

                <View>
                    <Text style={styles.inputLabel}>NAMA LIST ITEM</Text>
                    <TextInput 
                        style={styles.textInputStyle}
                        placeholder='Tambahkan nama list item'/>
                </View>
            </View>
        </View>
      </View>
    </Modal>
  )
}

export default index

const styles = StyleSheet.create({
    modalContainer:{
        backgroundColor:'#11111150',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:20,
    },
    cardContainer:{
        width:width-20,
        backgroundColor:'#FFFFFF',        
        borderRadius:12,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,    
    },
    modalHeaderContainer:{
        borderBottomWidth:1,
        borderColor:'#E5E5E5',
        paddingVertical:17, 
        paddingHorizontal:22,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    modalAddTitle:{
        fontFamily:'Poppins-SemiBold',
        color:'#111111',
        fontSize:16
    },
    modalBodyContainer:{
        paddingVertical:28,
        paddingHorizontal:22,
    },
    inputLabel:{
        fontFamily:'Poppins-SemiBold',
        color:'#111111',
        fontSize:10,
        marginBottom:12
    },
    textInputStyle:{
        borderWidth:1,
        borderColor:'#E5E5E5',
        borderRadius:6,
        padding:16,
        marginBottom:23
    }
})