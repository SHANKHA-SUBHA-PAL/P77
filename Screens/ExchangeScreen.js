import React from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity,ToastAndroid,Modal, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Homescreen from './HomeScreen'
import db from '../config'
import firebase from 'firebase'

export default class Exchange extends React.Component{
constructor(){
super()

this.state={

userName:firebase.auth().currentUser.email,
itemName:'',
description:''

}
}

addItem=(itemName,description)=>{
    var userName = this.state.userName
    db.colection('Exchange_requests').add({
        "userName":userName,
        "item_name":itemName,
        "description":description
    })
    this.setState({itemName:'',description:''})

    return alert(
        'Item Ready To Exchange',
        '',
        [
            {text:'OK',onPress:()=>{
                this.props.navigation.navigate('Homescreen')
            }}
        ]
    )
}


render(){
    return(
        <View style={styles.container}>
            <TextInput style={styles.formTextInput}/>
            <TextInput style={styles.formTextInput}/>
            <TouchableOpacity style={styles.loginButton} 
            onPress={()=>{this.addItem(this.state.itemName,this.state.description)}}
            >
                <Text style={{fontSize:20,fontWeight:3}}>ADD ITEM</Text>
            </TouchableOpacity>
        </View>
    )
}

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginBox:
      {
        width: 300,
      height: 40,
      borderWidth: 1.5,
      fontSize: 20,
      margin:10,
      paddingLeft:10
      },
      loginButton:{
  
          height:30,
          width:90,
          borderWidth:1,
          marginTop:20,
          paddingTop:5,
          borderRadius:7,
  backgroundColor:'#ff5722'
  
      },
      modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ffff",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
      },
      KeyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      modalTitle :{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'#ff5722',
        margin:50
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      cancelButton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
      },
      registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
      },
      registerButtonText:{
        color:'#ff5722',
        fontSize:15,
        fontWeight:'bold'
      },
  
  });