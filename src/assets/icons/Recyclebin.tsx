import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Recyclebin = (props:any) => (
  <Svg
    width={12}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M2 3.5h8M5 5.5v3M7 5.5v3M2.5 3.5l.5 6a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1l.5-6M4.5 3.5V2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1.5"
      stroke="#888"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default Recyclebin