import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as productAction from '../store/product/actions';
import * as screenAction from '../store/screen/actions';

class ProductItem extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style={this.props.style}>
                <TouchableOpacity style={styles.container} onPress={() => this.onPress()}>
                    <Image 
                        style={styles.image} 
                        source={this.props.product.image == ''? require('../assets/weedora.png'): { uri: this.props.product.image }}
                    />
                    <Image style={styles.weedora} source={require('../assets/weedora.png')} />
                    <Text style={styles.title} numberOfLines={1}>
                        {this.props.product.name}
                    </Text>
                    {
                        this.props.product.stock?
                        <Text style={styles.instock}>
                            In Stock
                        </Text>:
                        <Text style={styles.outstock}>
                            Out of Stock
                        </Text>
                    }
                </TouchableOpacity>
            </View>
        );
    }

    onPress() {
        //if (this.props.product.stock) {
            this.props.productAction.updateProduct(this.props.product);
            this.props.navigation.navigate("Product");
            this.props.screenAction.pushScreen("Product");
        //}
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderColor: '#034838',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode: 'contain'
    },
    weedora: {
        width: '100%',
        height: undefined,
        aspectRatio: 2,
        resizeMode: 'cover'
    },
    title: {
        color: '#034838',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 5
    },
    instock: {
        color: '#034838',
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 5
    },
    outstock: {
        color: '#ff0000',
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 5
    },
});

export default connect(
    state => ({
        screens: state.screen.screens
    }),
    dispatch => ({
        productAction: bindActionCreators(productAction, dispatch),
        screenAction: bindActionCreators(screenAction, dispatch)
    })
)(ProductItem);