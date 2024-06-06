/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line react/prop-types
import logo from '../../assets/logo.png'
// eslint-disable-next-line react/prop-types
const Logo = ({w,h}) => {
  return (
      <img width={w} height={h} src={logo} alt={logo}/>
  )
}


export default Logo