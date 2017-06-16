const imgURL = '../assets/images/bigstock-Group-Of-Friends-Meeting-For-L-59135003.jpg'
const style = {

  container: {
    backgroundColor: '#263238',
    height: '100vh',
    width: '100%',
    minWidth: '600px',
    maxWidth: '100%',
    paddingTop: '2.5vh',
    // paddingLeft: '2.5vh',
    // paddingRight: '2.5vh',
    margin: '0 auto'
  },
  heroStart: {
    display: 'flex',
    backgroundImage: 'url(' + imgURL + ')',
    backgroundSize: 'cover',
    width: '100%',
    paddingTop: '2vh',
    paddingBottom: '3vh',
    paddingLeft: '2.5vw',
    paddingRight: '2.5vw',
    margin: '0 auto',
    fontColor: '#3b464b',
    fontWeight: '400',
    fontSize: '18px',
    flexGrow: 1,
    // -webkitFilter: 'blur(5px)',
    // -mozFilter: 'blur(5px)',
    // -oFilter: 'blur(5px)',
    // -msFilter: 'blur(5px)',
    filter: 'blur(5px)'
  },

  heroInner: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    minHeight: '70vh',
    width: '100%',
    paddingTop: '8vh',
    paddingBottom: '8vh',
    margin: '0 auto',
    fontColor: '#3b464b',
    fontWeight: '400',
    fontSize: '12px'
  },

  leftBox: {
    top: '50%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '1vh',
    paddingLeft: '2.5vw',
    paddingRight: '2.5vw',
    verticalAlign: 'middle',
    color: 'white',
    flexGrow: 999
  },

  navbar: {
    width: '100vw',
    position: 'absolute',
    transform: 'translate(0px,2vh)',
    paddingLeft: '0.5vw',
    paddingRight: '0.5vw'
  },

  rightBox: {
    top: '50%',
    display: 'flex',
    paddingTop: '1vh',
    paddingLeft: '2.5vw',
    paddingRight: '2.5vw',
    verticalAlign: 'middle',
    flexGrow: 1,
    width: '40%'
  },
  internal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'flex-end',
    padding: '20px',
    fontSize: '1.5em',
    width: '100%'
  },

  buttonContainer: {
    display: 'flex',
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },

  phonePhoto: {
    maxWidth: '100%',
    maxHeight: '60%',
    padding: '5px'
  },
  midSect: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#0f5959',
    width: '100%',
    paddingTop: '1vh',
    paddingBottom: '1vh',
    margin: '0 auto',
    fontColor: '#3b464b',
    fontWeight: '400',
    fontSize: '12px',
    alignItems: 'flex-end'
  },
  topicLeft: {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    height: '30vh',
    width: '50%',
    paddingTop: '.5vh',
    paddingLeft: '3.5vw',
    paddingRight: '1.5vw',
    textAlign: 'center',
    verticalAlign: 'top'
  },
  topicRight: {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    height: '30vh',
    width: '50%',
    maxHeight: '30vh',
    paddingTop: '2.5vh',
    paddingLeft: '1.5vw',
    paddingRight: '3.5vw',
    textAlign: 'center'
  },
  divider: {
    position: 'absolute',
    width: '20%',
    display: 'inline-block',
    left: '50%',
    top: '10%',
    bottom: '10%',
    borderLeft: '1px solid white'
  },
    footer: {
    display: 'block',
    backgroundColor: '#263238',
    width: '100%',
    maxWidth: '100%',
    paddingTop: '1vh',
    margin: '0 auto',
    textAlign: 'center',
    fontColor: 'white'
  },
  footList: {
    width: 'calc(100% / 8)',
    display: 'inline-block',
    verticalAlign: 'top',
    top: '10%',
    textAlign: 'center',
    margin: '2%',
    padding: '2%',
    color: 'white',
    fontWeight: '300'
  },
  h3: {
    marginTop: '0px'
  }
}

export default style
