import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as productAction from '../store/product/actions';

class CartItem extends Component {
    constructor(props){
        super(props)

        this.state={
            item: this.props.item
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (JSON.stringify(prevProps.item) != JSON.stringify(this.props.item)) {
            this.setState({ item: this.props.item });
        }
    }

    render() {
        return (
            <View style={this.props.style}>
                <View style={styles.container}>
                    <Image 
                        style={styles.image} 
                        source={this.state.item.product.image == ''? require('../assets/weedora.png'): { uri: this.state.item.product.image }} 
                    />
                    <View style={styles.rightView}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
                        { this.state.item.product.name }
                        </Text>
                        <Text style={{ fontSize: 20, marginBottom: 20 }}>
                        {
                            this.state.item.product.type == 0?
                            '$' + this.state.item.product.price:
                            (
                                this.state.item.ozUnit == 1?
                                '$' + this.state.item.product.price + ' Per o.z':
                                '$' + this.state.item.product.price / 2 + ' Per 1/2 o.z'
                            )
                        }
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <View style={styles.quantityButton}>
                                <TouchableOpacity onPress={this.props.onMinus}>
                                    <Text style={styles.pmText}>
                                    { '-' }
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>
                                { this.state.item.quantity.toFixed(1) }
                                </Text>
                                <TouchableOpacity onPress={this.props.onPlus}>
                                    <Text style={styles.pmText}>
                                    { '+' }
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        elevation: 1,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
    },
    image: {
        width: '30%',
        height: undefined,
        aspectRatio: 1,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        resizeMode: 'contain'
    },
    rightView: {
        flex: 1,
        padding: 10
    },
    quantityButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 5,
        borderColor: '#034838',
        borderWidth: 1,
        backgroundColor: '#034838',
        width: 130
    },
    pmText: {
        color: '#ffffff', 
        padding: 10, 
        paddingVertical: 10, 
        paddingHorizontal: 15, 
        fontSize: 18, 
        textAlign: 'center'
    },
    quantityText: {
        backgroundColor: '#ffffff', 
        color: '#034838', 
        paddingVertical: 10, 
        paddingHorizontal: 15, 
        fontSize: 18, 
        textAlign: 'center'
    }
});

export default connect(
    state => ({
    }),
    dispatch => ({
        productAction: bindActionCreators(productAction, dispatch),
    })
)(CartItem);