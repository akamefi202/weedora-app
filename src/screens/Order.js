import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native'

import { connect } from 'react-redux';

import Header from '../components/Header';
import { bindActionCreators } from "redux";
import * as screenAction from '../store/screen/actions';

class Order extends Component{
    static navigationOptions = {
        title: "Recent Orders",
        header: props => <Header back={true} {...props} />
    };

    constructor(props){
        super(props)

        this.state={
            order: this.props.order
        }
    }

    render(){
        return(
            <ScrollView style={{ backgroundColor: '#ffffff' }}>
                <View style={styles.container}>
                {
                    this.props.order.items.map((item, index) => (
                        <View key={index} style={styles.element}>
                            <View>
                                <Text style={{ fontSize: 16, marginBottom: 5 }}>
                                { item.product.name }
                                </Text>
                                <Text style={{ color: '#808080' }}>
                                { 'Quantity: ' + item.quantity.toFixed(1) }
                                </Text>
                            </View>
                            <Text style={{ color: '#808080' }}>
                            { '$' + item.product.price.toFixed(2) }
                            </Text>
                        </View>
                    ))
                }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 10
    },
    element: {
        paddingVertical: 10,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        borderBottomWidth: 1, 
        borderBottomColor: '#808080'
    }
})

export default connect(
    state => ({
        order: state.order.order,
        screens: state.screen.screens
    }),
    dispatch => ({
        screenAction: bindActionCreators(screenAction, dispatch)
    })
)(Order);