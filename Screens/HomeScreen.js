import React from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity,ToastAndroid,Modal, ScrollView, KeyboardAvoidingView, Alert,FlatList } from 'react-native';
import {ListItem} from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'

export default class Homescreen extends React.Component{
    constructor() {
        super();
        this.state = {
            requestedExchanges: []
        }
        this.requestRef = null;
    }


    getRequestedBooksList = () => {
        this.requestRef = db.collection("Exchange_requests")
            .onSnapshot((snapshot) => {
                var requestedExchanges = snapshot.docs.map(document => document.data());
                this.setState({
                    requestedExchanges: requestedExchanges
                })
            })
    }

    componentDidMount() {
        this.getRequestedBooksList()
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, i }) => {
        return (
        <View style={{ flex: 1, paddingTop: 30 }}>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
                        {item.item_name}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                        {item.description}
                    </ListItem.Subtitle>
                </ListItem.Content>
                <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate('RecieverDeatails',{"details":item}) }}>
                    <Text style={{ color: '#ffff' }}>View</Text>
                </TouchableOpacity>
            </ListItem>
        </View>
        )
    }

    render() {

        return (

            <View style={{ flex: 1 }}>

                <View style={{ flex: 1 }}>
                    {

                        this.state.requestedExchanges.length === 0
                            ? (
                                <View style={styles.subContainer}>
                                    <Text style={{ fontSize: 20 }}>List of all Requested Books</Text>
                                </View>
                            )
                            : (
                                <FlatList
                                    keyExtractor={this.keyExtractor}
                                    data={this.state.requestedExchanges}
                                    renderItem={this.renderItem} />
                            )
                    }

                </View >

            </View>

        )
    }

}

const styles = StyleSheet.create({


    subContainer: {
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'



    },
    button: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        }
    }
})