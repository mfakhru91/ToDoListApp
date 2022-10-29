import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Dimensions, Image } from 'react-native'
import React, { useEffect, useState, FC, useRef } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigationParamsList } from '../../routes/navigationParamsList'
import Api from '../../utils/Api'
import dayjs from 'dayjs'
import { ActivityEmptyState, PlusIcon, Recyclebin } from '../../assets'
import { EMAIL } from '../../utils/config'
import { AddButton, AlertActivity, DeleteModal } from '../../components'
import { ToastHandler } from '../../components/AlertActivity/AlertActivityProps'
const {width,height} = Dimensions.get('window')

type ItemType = {
  "id": number;
  "title": string;
  "created_at": string
}

type AlertModal = {
  visible:boolean,
  title:string
}

const Dashboard:FC<NativeStackScreenProps<NavigationParamsList,'DashboardScreen'>> 
= ({navigation}) => {

  const toast = useRef<any>()
  const [items, setItems] = useState<ItemType[]>([])
  const [modalDelete, setModalDelete] = useState<{visible:boolean,item?:ItemType}>({
    visible:false
  })
  const [alertModal, setAlertModal] = useState<AlertModal>({
    visible:false,
    title:''
  })

  const getActivityt = async () => {
    try {    
      const axios = await Api()
      const request = await axios.get(`/activity-groups?email=${EMAIL}`)
      if (request.status === 200) {
        setItems(request.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onAddNewActivity = async () => {
    try {    
      const data = {
        "title": "New Activity",
        "email": EMAIL,
      }
      const axios = await Api()
      const request = await axios.post(`/activity-groups?email=${EMAIL}`,data)
      if (request.status === 201) {
        getActivityt()
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onDeleteItem = async () => {
    try {    
      const data = {
        "title": "New Activity",
        "email": EMAIL,
      }
      const axios = await Api()
      const request = await axios.delete(`/activity-groups/${modalDelete?.item?.id}`)
      console.log(request.status);   
      if (request.status === 200) {
        getActivityt() 
        toast.current.setModalVisible('Activity berhasil dihapus')
        setModalDelete(state=>({visible:false}))  
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const onGetDetailActivity = async (id:number) => {
    try {    
      const axios = await Api()
      const request = await axios.get(`/activity-groups/${id}`)
      console.log(request.status);   
      if (request.status === 200) {
        navigation.navigate('ItemListScreen',{activity:request.data})
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getActivityt()
    const unsubscribe = navigation.addListener('focus', async () => {
    });
    return unsubscribe;
  }, [])
  
  const renderItem = ({item,index}:{item:ItemType,index:number}) => (
    <TouchableOpacity
      onPress={()=>onGetDetailActivity(item.id)}
      style={styles.activityItem}
      accessibilityLabel="activity-item">
        <Text 
          style={styles.activityItemTitle}
          accessibilityLabel="activity-item-title">{item.title}</Text>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text
            style={styles.activityItemDate}
            accessibilityLabel="activity-item-date">{dayjs(item.created_at).format("D MMMM YYYY")}</Text>
          <TouchableOpacity  
            onPress={()=>{
              setModalDelete(state=>({visible:true,item:item}))
            }}
            accessibilityLabel="activity-item-delete-button">
            <Recyclebin/>
          </TouchableOpacity>
        </View>
      </TouchableOpacity> 
  )

  const RenderHeader = () => (
    <View style={styles.activityHeaderContainer}>
      <Text 
        style={styles.activityTitle}
        accessibilityLabel='activity-title'>Activity</Text>
      <AddButton 
        onPress={onAddNewActivity}
        accessibilityLabel='activity-add-button'/>
  </View>
  )

  const EmtyComponent = () => (
    <View
      style={styles.activityEmptyState}
      accessibilityLabel='activity-empty-state'>
      <Image 
        source={ActivityEmptyState}
        style={styles.activityEmptyStateImage}/>
      <Text style={styles.activityEmptyStateText}>Buat activity pertamamu</Text>
    </View>
  )

  return (
    <View style={styles.container}>
        <FlatList
          key={";istActivity"}
          data={items}
          ListHeaderComponent={RenderHeader}
          renderItem={renderItem}
          ListEmptyComponent={EmtyComponent}
          numColumns={2}
          contentContainerStyle={{paddingBottom:20,paddingHorizontal:20}}
          columnWrapperStyle={styles.activityContainer}
          keyExtractor={(item)=>item.id.toString()}
        />
        <AlertActivity ref={toast} duration={800}/>
        <DeleteModal 
          accessibilityLabel='delete-activity'
          onCancel={()=>setModalDelete(state=>({visible:false}))}
          onDelete={onDeleteItem}
          visible={modalDelete?.visible}
          title={`Apakah anda yakin menghapus activity (“${modalDelete?.item?.title}”?)`}/>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FFFFFF',
    flex:1,
  },
  activityHeaderContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingTop:8,
    marginTop:20
  },
  activityTitle:{
    fontSize:16,
    fontWeight:'700',
    fontFamily:'Poppins-Regular',
    color:'#111111'
  },
  activityContainer:{
    justifyContent:'space-between',    
  },
  activityItem:{
    backgroundColor:'#FFFFFF',
    borderRadius:12,
    paddingHorizontal:17, 
    paddingTop:13,
    paddingBottom:17,
    shadowColor: "#00000090",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width:(width/2)-30,
    height:(width/2)-30,
    marginTop:20,
  },
  activityItemTitle:{
    fontSize:14,
    fontFamily:'Poppins-Regular',
    color:'#111111',
    fontWeight:'700',
    flex:1,
  },
  activityItemDate:{
    fontFamily:'Poppins-Regular',
    fontSize:10
  },
  activityEmptyState:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  activityEmptyStateImage:{
    resizeMode:'contain',
    width:'100%'
  },
  activityEmptyStateText:{
    fontWeight:'600',
    fontFamily:'Poppins-Regular',
    fontSize:16,
    color:'#555555'
  }
})