import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DeleteModalProps } from './DeleteModalProps'
import { ModalDeleteIcon } from '../../assets'

const index = (props:DeleteModalProps) => {

    const Title = () => {
        const reg = /\(([^)]+)\)/;
        const title = props.title
        const string = title.match(reg)
        if (string !== null) {
            return <Text accessibilityLabel="modal-delete-title" style={styles.modalDeleteTitle}>{title.replace(string[0],'')}<Text style={{fontWeight:'700'}}>{string[1]}</Text></Text>
        }
        return <Text accessibilityLabel="modal-delete-title" style={styles.modalDeleteTitle}>{title}</Text>
    }

    return (
        <Modal 
            transparent
            {...props}>
            <View style={styles.modalContainer}>
                <View style={styles.cardContainer}>
                    <ModalDeleteIcon accessibilityLabel="modal-delete-icon" />
                    <Title/>  

                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                            onPress={props.onCancel} 
                            style={[styles.modalAddSaveButton,{backgroundColor:'#F4F4F4'}]}
                            accessibilityLabel="modal-add-save-button">
                            <Text style={[styles.modalAddSaveButtonText,{color:'#4A4A4A'}]}>Batal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={props.onDelete}
                            style={[styles.modalAddSaveButton,{backgroundColor:'#ED4C5C'}]}
                            accessibilityLabel="modal-add-save-button">
                            <Text style={[styles.modalAddSaveButtonText,{color:'#FFFFFF'}]}>Hapus</Text>
                        </TouchableOpacity>
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
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FFFFFF',
        paddingHorizontal:38,
        paddingVertical:36,
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
    modalDeleteTitle:{
        fontFamily:'Poppins-Regular',
        fontSize:14,
        color:"#111111",
        textAlign:'center',
        marginTop:41,
        marginBottom:43
    },
    modalFooter:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    modalAddSaveButton:{
        paddingVertical:12,
        flex:1,
        borderRadius:45,
        marginHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'red'
    },
    modalAddSaveButtonText:{
        fontFamily:'Poppins-Regular',
        fontSize:16,
        fontWeight:'600',
    }
})