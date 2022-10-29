import { ModalProps } from "react-native";

export interface ModalAddProps extends ModalProps {
    type:'add'|'update'
    onClose:()=>void
    activityId?:number,
    itemUpadate?:TodoItemType,
    onCreateSuccess:(item:TodoItemType)=>void,
    onUpdateSuccess:(item:TodoItemType)=>void
}

type TodoItemType =  {
    "is_active": number
    "priority": 'very-high'|'high'|'normal'|'low'|'very-low',
    "created_at": string
    "updated_at": string
    "id": number
    "activity_group_id": number,
    "title": string
  }