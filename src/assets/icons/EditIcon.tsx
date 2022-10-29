import * as React from "react"
import Svg, { Path } from "react-native-svg"

const EditIcon = (props:any) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M3.333 16.666h3.334l8.75-8.75a2.357 2.357 0 0 0-3.334-3.333l-8.75 8.75v3.333ZM11.25 5.417l3.333 3.333"
      stroke="#A4A4A4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default EditIcon
