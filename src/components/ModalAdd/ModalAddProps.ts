import { ModalProps } from "react-native";

export interface ModalAddProps extends ModalProps {
    type:'add'|'update'
    onClose:()=>void
}