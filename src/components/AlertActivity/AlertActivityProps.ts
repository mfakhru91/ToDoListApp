import { ModalProps, ViewStyle } from "react-native";

export interface AlertActivityProps extends ModalProps {
    style?: ViewStyle,
    duration?:number
}

export type ToastHandler = {
    setModalVisible: (string:string)=> void
}