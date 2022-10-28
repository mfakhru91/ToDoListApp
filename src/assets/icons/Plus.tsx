import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Plus = (props:any) => (
  <Svg
    width={12}
    height={13}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6 3v7M2.5 6.5h7"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </Svg>
)

export default Plus