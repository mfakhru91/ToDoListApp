import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ModalAddProps } from './ModalAddProps'
import { CloseIcon } from '../../assets'
import { TextInput } from 'react-native-gesture-handler'
import DropDownPicker from 'react-native-dropdown-picker';                        
import Api from '../../utils/Api'

const {width,height} = Dimensions.get('window')

const indicatorColor = {
    'very-high':'#ED4C5C',
    'high':'#F8A541',
    'normal':'#00A790',
    'low':'#428BC1',
    'very-low':'#8942C1'
  }

const index = (props:ModalAddProps) => {
    const [itemName, setItemName] = useState('')
    const [openPriority, setOpenPriority] = useState(false)
    const [priorityValue, setPriorityValue] = useState('')
    const [itemsPriority, setItemsPriority] = useState([
        {value:'very-high',label:'Very High',icon:()=>Indicator('very-high')},
        {value:'high',label:'High',icon:()=>Indicator('high')},
        {value:'normal',label:'Medium',icon:()=>Indicator('normal')},
        {value:'low',label:'Low',icon:()=>Indicator('low')},
        {value:'very-low',label:'Very Low',icon:()=>Indicator('very-low')}
    ])

    useEffect(() => {
      if (props.type == 'update') {
        if (props.itemUpadate) {
            const item = props.itemUpadate
            const priority = item.priority
            setItemName(item.title)
            setPriorityValue(priority)
            console.log(item);
            
        }
      }
    }, [props.visible])
    

    const Indicator = (priority: 'very-high'|'high'|'normal'|'low'|'very-low') =>(
        <View
        style={[styles.todoItemPriorityIndicator,{backgroundColor:indicatorColor[priority]}]}
        accessibilityLabel='todo-item-priority-indicator'/>
    )

    const onCreateItem = async () => {
        try {    
            const data:any = {
                "activity_group_id": props.activityId,
                "title": itemName !== ''?itemName:'new item',
            }
            if (priorityValue !== '') {
                data.priority = priorityValue
            }
            const axios = await Api()
            const request = await axios.post(`/todo-items`,data)
            
            if (request.status === 201) {
                props.onCreateSuccess(request.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onUpdateItem = async () => {        
        try {
            const item = props.itemUpadate
            const axios = await Api()
            const formData = {
                "title": itemName,
                "is_active": item?.is_active,
                "priority": priorityValue,
            }
            const request = await axios.patch(`/todo-items/${item?.id}`,formData)
            if (request.status === 200) {
              props.onUpdateSuccess(request.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    

    return (
        <Modal
            accessibilityLabel='tambah-list-item'
            transparent
            {...props}>
            <View style={styles.modalContainer}>
                <View style={styles.cardContainer}>
                    <View style={styles.modalHeaderContainer}>
                        <Text 
                            accessibilityLabel='modal-add-item'
                            style={styles.modalAddTitle}>{props.type === 'add'?'Tambah':'Update'} List Item</Text>
                        <TouchableOpacity
                            accessibilityLabel='modal-add-close-button'
                            onPress={props.onClose}>
                            <CloseIcon/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalBodyContainer}>
                        <View>
                            <Text                                 
                                accessibilityLabel='modal-add-name-title'
                                style={styles.inputLabel}>NAMA LIST ITEM</Text>
                            <TextInput 
                                accessibilityLabel='modal-add-name-input'
                                onChangeText={(text)=>setItemName(text)}
                                style={styles.textInputStyle}
                                placeholderTextColor={"#111111"}
                                value={itemName}
                                placeholder='Tambahkan nama list item'/>
                        </View>

                        <View>
                            <Text 
                                accessibilityLabel='modal-add-priority-title'
                                style={styles.inputLabel}>NAMA LIST ITEM</Text>
                            <View
                                accessibilityLabel='modal-add-priority-dropdown'>
                                <DropDownPicker
                                    open={openPriority}
                                    value={priorityValue}
                                    items={itemsPriority}
                                    setOpen={setOpenPriority}
                                    setValue={setPriorityValue}
                                    setItems={setItemsPriority}
                                    placeholder='Pilih priority'
                                    labelStyle={styles.dropdownLabelStyle}
                                    style={styles.dowpdownStyle}
                                    dropDownContainerStyle={styles.dropDownContainerStyle}
                                    listItemContainerStyle={styles.listItemContainerStyle}
                                    />
                            </View>
                        </View>
                    </View>
                    <View style={styles.modalFooter}>
                        <TouchableOpacity 
                            accessibilityLabel='modal-add-save-button '
                            onPress={()=>props.type === 'add'?onCreateItem():onUpdateItem()}
                            style={styles.modalSaveButton}>
                            <Text style={styles.modalSaveButtonText}>Simpan</Text>
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
        width:width-30,
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
    },
    todoItemPriorityIndicator:{
        height:14,
        width:14, 
        borderRadius:14,
        marginHorizontal:14,
    },
    dowpdownStyle:{
        borderColor:'#E5E5E5'
    },
    dropdownLabelStyle:{
        color:'#111111'
    },
    dropDownContainerStyle:{
        borderColor:'#E5E5E5'
    },
    listItemContainerStyle:{
        borderWidth:1,
        borderColor:'#E5E5E5',
        height:52
    },
    modalFooter:{
        paddingVertical:18,
        paddingHorizontal:27,
        alignItems:'flex-end',
        justifyContent:'center',
        borderTopWidth:1,
        borderColor:'#E5E5E5'
    },
    modalSaveButton:{
        width:150,
        alignItems:'center',
        paddingVertical:13,
        paddingHorizontal:14,
        backgroundColor:'#16ABF8',
        borderRadius:45,
        opacity:0.2
    },
    modalSaveButtonText:{
        fontSize:16,
        fontFamily:'Poppins-SemiBold',
        color:'#FFFFFF'
    }
})