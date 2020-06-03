import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    Image
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as orderAction from '../store/order/actions';
import * as cartAction from '../store/cart/actions';
import * as screenAction from '../store/screen/actions';

import Order from '../screens/Order';

class OrderItem extends Component {
    constructor(props){
        super(props)

        this.state={
        }
    }

    render() {
        return (
            <View style={this.props.style}>
                <TouchableHighlight onPress={() => this.onOrderPress()}>
                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                            <View style={{ width: '80%' }}>
                                <Text style={{ fontSize: 16 }}>{ this.getOrderName() }</Text>
                                <Text style={{ color: '#808080' }}>{ this.props.order.fullName }</Text>
                            </View>
                            <Text style={{ color: '#034838' }}>{ '$' + this.props.order.totalPrice.toFixed(2) }</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <Text style={{ color: '#808080' }}>
                            { this.props.order.deliveryDetails }
                            </Text>
                            <TouchableOpacity onPress={() => this.onReorder()} style={{ backgroundColor: '#034838', borderRadius: 5, padding: 10, alignItems: 'center' }}>
                                <Text style={{ color: '#ffffff', fontSize: 16 }}>
                                    REORDER
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    onReorder() {
        this.props.cartAction.updateCart(this.props.order.items);
        this.props.navigation.navigate('Purchase');
        this.props.screenAction.pushScreen("Purchase");
    }

    onOrderPress() {
        this.props.orderAction.updateOrder(this.props.order);
        this.props.navigation.navigate('Order');
        this.props.screenAction.pushScreen("Order");
    }

    getOrderName() {
        var order = this.props.order;
        var name = order.items[0].product.name;
        if (order.items.length > 1) name += (' & ' + (order.items.length - 1) + ' more');

        return name;
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        padding: 10,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
    },
});

export default connect(
    state => ({
        orders: state.order.orders,
        screens: state.screen.screens
    }),
    dispatch => ({
        orderAction: bindActionCreators(orderAction, dispatch),
        cartAction: bindActionCreators(cartAction, dispatch),
        screenAction: bindActionCreators(screenAction, dispatch)
    })
)(OrderItem);