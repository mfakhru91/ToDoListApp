import { View, Text, StyleSheet, TextInput, TouchableOpacity, TextInputProps, FlatList, Image } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigationParamsList } from '../../routes/navigationParamsList'
import EditIcon from '../../assets/icons/EditIcon'
import { AddButton, AlertActivity, DeleteModal, ModalAdd } from '../../components'
import { Recyclebin, TodoEditButtonImage, TodoEmptyState } from '../../assets'
import CheckBox from '@react-native-community/checkbox'
import Api from '../../utils/Api'
import { act } from 'react-test-renderer'

type TodoItemType =  {
  "is_active": number
  "priority": 'very-high'|'high'|'normal'|'low'|'very-low',
  "created_at": string
  "updated_at": string
  "id": number
  "activity_group_id": number,
  "title": string
}

type itemModalActionType = {
  visible:boolean
  type:'add'|'update'
  activityId?:number
  itemUpdate?:TodoItemType,
}

const ItemList:FC<NativeStackScreenProps<NavigationParamsList,'ItemListScreen'>> 
= ({route}) => {
  const {activity} = route.params
  const [isTitleEditable, setIsTitleEditable] = useState(false)  
  const [activityTitle, setActivityTitle] = useState(activity.title)
  const [todoItem, setTodoItem] = useState<any[]>(activity.todo_items)
  const [modalDelete, setModalDelete] = useState<{visible:boolean,item?:TodoItemType}>({
    visible:false
  })
  const [onShowItemModalAction, setOnShowItemModalAction] = useState<itemModalActionType>({
    visible:false,
    type:'add'
  })
  const toast = useRef<any>()

  const indicatorColor = {
    'very-high':'#ED4C5C',
    'high':'#F8A541',
    'normal':'#00A790',
    'low':'#428BC1',
    'very-low':'#8942C1'
  }
  
  const onChangeTodoCheckBox = async (item:TodoItemType,index:number) => { 
      try {
          const axios = await Api()
          const formData = {
              "title": item.title,
              "is_active": item.is_active == 1?0:1,
              "priority": item.priority,
          }
          const request = await axios.patch(`/todo-items/${item.id}`,formData)
          if (request.status === 200) {
            const itemsTodo = [...todoItem]
            itemsTodo[index] = request.data
            setTodoItem(itemsTodo)
          }
      } catch (error) {
          console.log(error);
      }
  }

  const onGetTodoItem = async () => {
    try {
        const axios = await Api()
        const request = await axios.get(`todo-items?activity_group_id=${activity.id}`)
        console.log(request.data);
        if (request.status === 200) {
            setTodoItem(request.data.data)
        }
    } catch (error) {
        console.log(error);
    }
  }

  const onDeleteItem = async () => { 
    try {    
      const axios = await Api()
      const request = await axios.delete(`/todo-items/${modalDelete.item?.id}`)       
      if (request.status === 200) {
        toast.current.setModalVisible('Activity berhasil dihapus')
        setModalDelete(state=>({visible:false}))  
        onGetTodoItem()
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onAddNewItem = () => { 
    setOnShowItemModalAction({
      visible:true,
      type:'add',
      activityId:activity.id
    })
  }

  const onCreateSuccess = (item:TodoItemType) => {
    const itemTodo = [...todoItem]
    itemTodo.push(item)
    setTodoItem(itemTodo)
    setOnShowItemModalAction({
      visible:false,
      type:'add',
    })
  }

  const onUpdateSuccess = async (item:TodoItemType) => { 
    const itemTodo = [...todoItem]
    for (let index = 0; index < itemTodo.length; index++) {
      if (itemTodo[index].id == item.id) {
        itemTodo[index] = item
      }
    }
    setTodoItem(itemTodo)
    setOnShowItemModalAction({
      visible:false,
      type:'add',
    })
  }

  const onUpdateItem = (item:TodoItemType) => {
    setOnShowItemModalAction({
      visible:true,
      type:'update',
      itemUpdate:item
    })
  }

  const onUpdateActivity = async () => {
    try {    
      const axios = await Api()
      const formData = {
        "title": activityTitle
      }
      const request = await axios.patch(`/activity-groups/${activity.id}`,formData)
      console.log(request.data);   
      if (request.status === 200) {
        setIsTitleEditable(false)
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  const RenderItem = ({item,index}:{item:TodoItemType,index:any}) => {    
    return(
      <View 
          accessibilityLabel='todo-item'
          style={styles.todoItemStyle}>
          <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
              <CheckBox
                  accessibilityLabel='todo-item-checkbox'
                  disabled={false}
                  tintColors={{'true':'#16ABF8','false':'#C7C7C7'}}
                  tintColor='#16ABF8'
                  onFillColor='#C7C7C7'
                  onChange={()=>onChangeTodoCheckBox(item,index)}
                  value={item.is_active == 0} />
              <View
                  style={[styles.todoItemPriorityIndicator,{backgroundColor:indicatorColor[item.priority]}]}
                  accessibilityLabel='todo-item-priority-indicator'/>
              <Text
                accessibilityLabel='todo-item-title' 
                style={[
                        styles.todoItemTitle,
                        {textDecorationLine:item.is_active === 0?'line-through':'none',
                        color:item.is_active === 1?'#111111':'#888888'}]}>{item.title}</Text>
              <TouchableOpacity
                onPress={()=>onUpdateItem(item)}
                accessibilityLabel='todo-item-edit-button'>
                  <Image source={TodoEditButtonImage} />
              </TouchableOpacity>
          </View>
          <TouchableOpacity
            accessibilityLabel='todo-item-delete-button'
            onPress={()=>setModalDelete({visible:true,item})}>
              <Recyclebin/>
          </TouchableOpacity>
      </View>
    )
  }
  

  const HeaderComponent = () => (
    <View>
      <View style={styles.actionContainer}>
          <AddButton 
            onPress={onAddNewItem}
            disabled={todoItem.length === 10}
            accessibilityLabel='activity-add-button'/>
      </View>
    </View>
  )

  const EmtyComponent = () => (
    <View 
      accessibilityLabel='todo-empty-state' 
      style={styles.emtyComponentContainer}>
      <Image
       style={styles.todoEmptySateImage}
       source={TodoEmptyState}/>
       <Text style={styles.todoEmptySateTitle}>Buat List Item kamu</Text>
    </View>
  )

  return (
    <View style={styles.container}>
        <View style={[styles.header,{borderBottomWidth:isTitleEditable?1:0}]}>
          {isTitleEditable?(
            <TextInput
              accessibilityLabel='activity-title' 
              autoFocus
              onChangeText={(text)=>setActivityTitle(text)}
              onEndEditing={onUpdateActivity}
              style={[styles.activityTitleInput,styles.activityTitleText]}               
              value={activityTitle}/>
          ):(
            <View
              accessibilityLabel='activity-title'
              style={styles.activityTitleInput} >
              <Text style={styles.activityTitleText}>{activityTitle}</Text>
            </View>
          )}
          <TouchableOpacity
            accessibilityLabel='todo-title-edit-button'
            onPress={()=>setIsTitleEditable(!isTitleEditable)}>
            <EditIcon/>
          </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={{flex:1,paddingHorizontal:20,}} 
        data={todoItem}
        renderItem={RenderItem}
        ListHeaderComponent={HeaderComponent}
        ListEmptyComponent={EmtyComponent}/>

      <AlertActivity ref={toast} duration={800}/>

      <ModalAdd 
        visible={onShowItemModalAction.visible} 
        type={onShowItemModalAction.type}
        activityId={onShowItemModalAction.activityId}
        itemUpadate={onShowItemModalAction.itemUpdate}
        onClose={()=>{setOnShowItemModalAction(state=>({...state,visible:false}))}}
        onCreateSuccess={(item)=>onCreateSuccess(item)}
        onUpdateSuccess={(item)=>onUpdateSuccess(item)}/>

      <DeleteModal
          accessibilityLabel='delete-list-item'
          onCancel={()=>setModalDelete(state=>({visible:false}))}
          onDelete={onDeleteItem}
          visible={modalDelete?.visible}
          title={`Apakah anda yakin menghapus List Item (“${modalDelete?.item?.title}”?)`}/>

    </View>
  )
}

export default ItemList

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FFFFFF',
    paddingTop:23,
    flex:1,
  },
  header:{
    borderColor:"#D8D8D8",
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:20,
  },
  activityTitleInput:{
    flex:1,
    height:40,
    padding:5,
    justifyContent:'center',
  },
  activityTitleText:{
    color:'#111111',
    fontSize:16,
    fontFamily:'Poppins-SemiBold',
  },
  actionContainer:{
    flexDirection:'row',
    justifyContent:'flex-end',
    paddingTop:24,
    paddingBottom:28
  },
  emtyComponentContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  todoEmptySateImage:{
    width:"100%",
    resizeMode:'contain',
    marginBottom:24
  },
  todoEmptySateTitle:{
    fontWeight:'600',
    fontFamily:'Poppins-Regular',
    fontSize:16,
    color:'#555555'
  },
  todoItemStyle:{
    backgroundColor:'#FFFFFF',
    borderRadius:12,
    paddingVertical:22,
    paddingHorizontal:19, 
    marginBottom:20,
    flexDirection:'row',
    alignItems:'center',
    shadowColor: "#00000090",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
},
todoItemPriorityIndicator:{
    height:5,
    width:5, 
    borderRadius:5,
    marginHorizontal:14,
},
todoItemTitle:{
    fontFamily:'Poppins-Medium',
    color:'#111111',
    marginRight:8,
}
})