import { StyleSheet } from 'react-native';
// import { Dimensions, PixelRatio } from 'react-native';
let pageBackgroundColor = '#2f879d'
let titleColor = "#363940"
let textColor = "#9DA5B7"

import {calcFontSize,calcHeight,calcWidth} from "./dimensions"
export default StyleSheet.create({
    h1:{
        color: titleColor,
        fontSize: calcFontSize(17),
        fontWeight: "bold",
        lineHeight: calcHeight(20),
    },
   card:{
    backgroundColor:'white',
    
    paddingTop:calcHeight(17),
    paddingBottom:calcHeight(5),
    paddingLeft:calcWidth(22)
   },
   textComm:{
    fontSize: calcFontSize(12),
    fontWeight: 'normal',
    color: textColor,
    lineHeight:14
   },
   viewBtn:{
    justifyContent: 'center', 
    width: '100%',
     alignItems: 'center',
      marginTop: calcHeight(48) 
  },
  button: {

    justifyContent: 'center',
    alignItems: 'center',
    width:calcWidth(220),
    height:calcHeight(51) ,
    backgroundColor: '#3F93D9',
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.65,

    elevation: 7,
  },
  buttonText: {
    color: '#fff',
    fontSize: calcFontSize(16),
    fontWeight: '600',
    lineHeight:calcHeight(19)
  },
  modal: {
    backgroundColor: '#FFFFFF',
    width: calcWidth(316),
    height: calcHeight(221),
   borderRadius:5,
   justifyContent:'center',
   alignItems:'center'
  },
  btnYes: { 
      width: calcWidth(82),
    backgroundColor: '#91CC62', 
    justifyContent: 'center', 
    alignItems: 'center', 
   
     borderRadius: 2 ,
     height:calcHeight(34)
    },
  btnNo: {
    width: calcWidth(82),
    height:calcHeight(34),
     backgroundColor: '#F56060',
      justifyContent: 'center',
       alignItems: 'center',
      
        borderRadius: 2
     },
     shodow:{
      shadowColor: "#DCDDE4",
      shadowOffset: {
        width: 0,
        height: calcHeight(2),
      },
      shadowOpacity: 0.8,
      shadowRadius: 1.4,
    
      elevation: 3, 
      marginBottom:calcHeight(1)
    },
});