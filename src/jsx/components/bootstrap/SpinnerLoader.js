import { Spinner } from "react-bootstrap"

export const SpinnerLoader = ({loading}) => {

  if(!loading) return <></>

  return <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      textAlign: 'center',
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d3d3d388',
    }}>
    <Spinner animation="border" role="status" size="xl" style={{
      width: "5rem",
      height: "5rem",
      borderWidth: ".5em"
    }}/>
  </div>
}