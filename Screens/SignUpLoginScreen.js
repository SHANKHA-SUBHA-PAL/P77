import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import firebase from 'firebase'
import db from '../config'

export default class SignUpLoginScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            username: '',
            password: ''
        }
    }

    userLogin = (username, password) => {

        firebase.auth().signInWithEmailAndPassword(username, password)
            .then((response) => {
                return Alert.alert("SUCCESSFULLY LOGIN")
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            })
    }

    userSignUp = (username, password) => {

        firebase.auth().createUserWithEmailAndPassword(username, password)
            .then((response) => {
                return Alert.alert("USER ADDED SUCCESSFULLY")
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            })
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: '#ff5722', fontSize: 40, marginLeft: 55,}}>BARTER APP</Text>
                
                    <TextInput style={styles.formTextInput} keyboardType='email-address' placeholder='Email' onChangeText={(text) => { this.setState({ username: text }) }} />

                    <TextInput style={styles.formTextInput} placeholder='passWord' onChangeText={(text) => { this.setState({ password: text }) }} />

                    <TouchableOpacity style={styles.button} onPress={() => { this.userSignUp(this.state.username, this.state.password) }}><Text>SIGN UP</Text></TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => { this.userLogin(this.state.username, this.state.password) }}> <Text>LOGIN</Text></TouchableOpacity>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        
        
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:300
      },
    formTextInput: {
        width: '50%',
        height: 35,
        alignSelf: 'center',
        borderColor: '#ffab91',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 30,
        padding: 10,
    },
    button: {
        width: "50%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8, },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: 20
    },

})