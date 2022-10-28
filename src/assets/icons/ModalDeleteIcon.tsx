import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ModalDeleteIcon = (props:any) => (
  <Svg
    width={62}
    height={62}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M31 38.75v.026m0-15.526v5.167-5.167ZM12.917 49.084h36.166a5.166 5.166 0 0 0 4.754-7.104L35.495 10.334a5.167 5.167 0 0 0-9.042 0L8.112 41.98a5.166 5.166 0 0 0 4.52 7.104"
      stroke="#ED4C5C"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default ModalDeleteIcon
