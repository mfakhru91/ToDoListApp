import { View, Text, StyleSheet, TextInput, TouchableOpacity, TextInputProps, FlatList, Image } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigationParamsList } from '../../routes/navigationParamsList'
import EditIcon from '../../assets/icons/EditIcon'
import { AddButton } from '../../components'
import { TodoEmptyState } from '../../assets'

const ItemList:FC<NativeStackScreenProps<NavigationParamsList,'ItemListScreen'>> 
= ({route}) => {
  const {activity} = route.params
  const [isTitleEditable, setIsTitleEditable] = useState(false)  
  const [activityTitle, setActivityTitle] = useState(activity.title)
  const [todoItem, setTodoItem] = useState<any[]>(activity.todo_items)

  const RenderItem = () => (
    <View 
      style={styles.todoItemStyle}>
    </View>
  )

  const HeaderComponent = () => (
    <View>
      <View style={[styles.header,{borderBottomWidth:isTitleEditable?1:0}]}>
          {isTitleEditable?(
            <TextInput
              accessibilityLabel='activity-title' 
              autoFocus
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

      <View style={styles.actionContainer}>
          <AddButton 
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

      <FlatList
        contentContainerStyle={{flex:1,paddingHorizontal:20,}} 
        data={todoItem}
        renderItem={RenderItem}
        ListHeaderComponent={HeaderComponent}
        ListEmptyComponent={EmtyComponent}/>

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
    alignItems:'center'
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
    shadowColor: "#00000090",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
})