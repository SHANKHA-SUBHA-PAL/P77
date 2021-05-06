import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,ToastAndroid,Modal, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';


import db from '../config'
import firebase from 'firebase'

export default class WelcomeScreen extends React.Component {
constructor(){

super();
this.state={

emailId:'',
passWord:'',
isModalVisible:'false',
FirstName:'',
LastName:'',
Address:'',
ContactNo:'',
confirmPassWord:'',

}
}  

            showModal= ()=>{

            return(
            <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isModalVisible}
            >
            <View style={styles.modalContainer}>
            <ScrollView style={{width:'100%'}}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
            <Text style={styles.modalTitle}>REGISTRATION</Text>
            <TextInput 
            style={styles.formTextInput} 
            placeholder={"First name"} 
            maxLength={8} 
            onChangeText={
              (text)=>{

                this.setState({FirstName:text})

              }
              
              }/>
              <TextInput 
            style={styles.formTextInput} 
            placeholder={"Last name"} 
            maxLength={8} 
            onChangeText={
              (text)=>{

                this.setState({LastName:text})

              }
              
              }/>
              <TextInput 
            style={styles.formTextInput} 
            placeholder={"Contact No."} 
            maxLength={10} 
            keyboardType="numeric"
            onChangeText={
              (text)=>{

                this.setState({ContactNo:text})

              }
              
              }/>
              <TextInput 
            style={styles.formTextInput} 
            placeholder={"Address"} 
            multiline={true}
            onChangeText={
              (text)=>{

                this.setState({Address:text})

              }
              
              }/>
            <TextInput 
            style={styles.formTextInput} 
            placeholder={"Email"}  
            keyboardType='email-address'
            onChangeText={
              (text)=>{

                this.setState({emailId:text})

              }
              
              }/>
              <TextInput 
            style={styles.formTextInput} 
            placeholder={"Password"} 
            secureTextEntry={true}
            onChangeText={
              (text)=>{

                this.setState({passWord:text})

              }
              
              }/>
              <TextInput 
            style={styles.formTextInput} 
            placeholder={"Confirm password"} 
            secureTextEntry={true} 
            onChangeText={
              (text)=>{
                this.setState({confirmPassWord:text})
              }
              
              }/>
              <View>
            <TouchableOpacity style={styles.registerButton}
            onPress={()=>{
              this.userSignup(this.state.emailId,this.state.passWord,this.state.confirmPassWord)
            }}><Text style={styles.registerButtonText}>REGISTER</Text></TouchableOpacity>
              </View>
              <View>
            <TouchableOpacity style={styles.cancleButton}
            onPress={()=>{
              this.setState({isModalVisible:false})
            }}><Text style={styles.registerButtonText}>CANCEL</Text></TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            </ScrollView>
            </View>
            </Modal>
            )
            }

            userLogin= (email,password)=>{

              firebase.auth().signInWithEmailAndPassword(email,password)
              .then(()=>{
                this.props.navigation.navigate('DonateBooks')
                
              })
              .catch(function(error){
                var errorCode= error.code;
                var errorMessage= error.message;
                return alert(errorMessage);
              })
              
              }
  
              userSignup= (email,password,confirmPassword)=>{
                if(password!== confirmPassword ){

                alert('PASSWORD DOES NOT MATCH\ Check Your Password')

                }else{

                firebase.auth().createUserWithEmailAndPassword(email,password)
                .then((response)=>{
                db.collection("Users").add({
                First_Name:this.state.FirstName,
                Last_Name:this.state.LastName,
                Contact_No:this.state.ContactNo,
                Address:this.state.Address,
                Email:this.state.emailId,
                })
                return Alert.alert(
                  "USER ADDED SUCCESFULLY",
                  "",
                  [
                    {text:'Ok',onPress: ()=>this.setState({isModalVisible:false})}
                  ]
                )

                })
                .catch(error=>{

                var errorMessage=error.message;

                return alert(errorMessage)

                })
            }
            }

    render(){
    return (
    
      <View style={styles.container}>
      <View style={{justifyContent:'center',alignItems:'center'}}>
        {this.showModal()}
      </View>
            <TextInput style={styles.loginBox} 
         placeholder="abc@example.com"
         keyboardType='email-address'
         onChangeText={text=>this.setState({emailId:text})}
         />
         <TextInput style={styles.loginBox} 
         placeholder="password"
        secureTextEntry={true}
         onChangeText={text=>this.setState({passWord:text})}
         />
       <TouchableOpacity style={styles.loginButton}
        onPress={()=>{
          this.userLogin(this.state.emailId,this.state.passWord)
        }}
        >
          <Text style={{textAlign:'center'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}
        onPress={()=>{
          this.setState({isModalVisible:true})
        }}
        >
          <Text style={{textAlign:'center'}}>Sign up</Text>
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
