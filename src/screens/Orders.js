import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { withNavigationFocus } from 'react-navigation'

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as orderAction from '../store/order/actions';
import * as screenAction from '../store/screen/actions';

import Header from '../components/Header';
import OrderItem from '../components/OrderItem';

class Orders extends Component{
    static navigationOptions = {
        title: "Recent Orders",
        header: props => <Header {...props} />
    };

    constructor(props){
        super(props)

        this.state={
            orders: this.props.orders
        }
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.orders) != JSON.stringify(prevState.orders)) {

            return {
                orders: nextProps.orders,
            };
        }
        return null;
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{ height: 50, backgroundColor: '#c0c0c0', justifyContent: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 18 }}>
                        Post Orders
                    </Text>
                </View>
                {
                    this.props.orders.length == 0?
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Text style={{ fontSize: 32, color: '#c0c0c0' }}>
                            No Previous Orders...
                        </Text>
                    </View>:
                    <View style={{ paddingTop: 10, flex: 1 }}>
                        <TouchableOpacity onPress={() => this.onClear()} style={{ backgroundColor: '#034838', borderRadius: 5, paddingVertical: 10, marginBottom: 10, marginHorizontal: 10, alignItems: 'center' }}>
                            <Text style={{ color: '#ffffff', fontSize: 18 }}>
                                CLEAR PAST ORDERS
                            </Text>
                        </TouchableOpacity>
                        <ScrollView style={{ padding: 10 }}>
                            <View>
                            {
                                this.props.orders.map((order, index) => {
                                    return <OrderItem key={index} order={order} style={styles.order} navigation={this.props.navigation       } />;
                                })
                            }
                            </View>
                        </ScrollView>
                    </View>
                }
            </View>
        )
    }

    onClear() {
        this.setState({ orders: [] });
        this.props.orderAction.clearOrders();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    order: {
        marginBottom: 10
    }
})

export default connect(
    state => ({
        orders: state.order.orders,
        screens: state.screen.screens
    }),
    dispatch => ({
        orderAction: bindActionCreators(orderAction, dispatch),
        screenAction: bindActionCreators(screenAction, dispatch)
    })
)(withNavigationFocus(Orders));