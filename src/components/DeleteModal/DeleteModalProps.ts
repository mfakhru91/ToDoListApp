import { ModalProps } from "react-native";

export interface DeleteModalProps extends ModalProps {
    title:string
    onCancel:()=>void
    onDelete:()=>void
}