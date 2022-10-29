import * as React from "react"
import Svg, { Path } from "react-native-svg"

const CloseIcon = (props:any) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m13.5 4.5-9 9M4.5 4.5l9 9"
      stroke="#A4A4A4"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default CloseIcon
