import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'
import Svg, { Path } from 'react-native-svg'

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as productAction from '../store/product/actions';
import * as cartAction from '../store/cart/actions';
import * as screenAction from '../store/screen/actions';

import Header from '../components/Header';
import { ScrollView } from 'react-native-gesture-handler';

class Product extends Component{
    static navigationOptions = {
        title: "Product",
        back: "Shop",
        header: props => <Header back={true} {...props } />
    };

    constructor(props){
        super(props)

        this.state={
            product: this.props.product,
            ozUnit: 1
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.product) != JSON.stringify(prevState.product)) {

            return {
                product: nextProps.product,
                ozUnit: 1
            };
        }
        return null;
    }

    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Image 
                        style={styles.image} 
                        source={this.state.product.image == ''? require('../assets/weedora.png'): { uri: this.state.product.image }}  
                    />
                    <View style={{ height: 1, borderWidth: 1, borderColor: '#000000' }} />
                    <Text style={{ fontSize: 18, padding: 20 }}>
                    { this.state.product.name }
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 }}>
                        {
                            this.state.ozUnit == 1? 
                            <Text style={styles.price}>{ 'Price: $' + this.state.product.price }</Text>:
                            <Text style={styles.price}>{ 'Price: $' + this.state.product.weight }</Text>
                        }
                        {
                            this.state.product.type == 2 &&
                            <ModalDropdown
                                style={{ 
                                    shadowOffset: { width: 0, height: 0 }, 
                                    shadowOpacity: 0.5,
                                    backgroundColor: '#ffffff',
                                    width: 120
                                }}
                                dropdownStyle={{ 
                                    shadowOffset: { width: 0, height: 0 }, 
                                    shadowOpacity: 0.5, 
                                    padding: 10, 
                                    width: 120, 
                                    height: 34 * 2 + 20 
                                }}
                                onSelect={(index) => {
                                    if (index == 0)
                                        this.setState({ ozUnit: 1 });
                                    else
                                        this.setState({ ozUnit: 0.5 });
                                }}
                                textStyle = {{ fontSize: 12, color: "#034838" }}
                                options={['Per o.z', 'Per 1/2 o.z']}
                                renderSeparator={() => { return null; }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between", paddingVertical: 13, paddingHorizontal: 10, width: 120 }}>
                                    {
                                        this.state.ozUnit == 1?
                                        <Text style={{ fontSize: 16, color: "#034838" }}>Per o.z</Text>:
                                        <Text style={{ fontSize: 16, color: "#034838" }}>Per 1/2 o.z</Text>
                                    }
                                    <Svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M1.27125 0.227806C0.980433 -0.0759354 0.508928 -0.0759354 0.218112 0.227806C-0.0727043 0.531547 -0.0727043 1.02401 0.218112 1.32775L4.47343 5.77219C4.76425 6.07594 5.23575 6.07594 5.52657 5.77219L9.78189 1.32775C10.0727 1.02401 10.0727 0.531547 9.78189 0.227806C9.49107 -0.0759354 9.01957 -0.0759354 8.72875 0.227806L4.99796 4.12441L1.27125 0.227806Z" fill="#969696"/>
                                    </Svg>
                                </View>
                            </ModalDropdown>
                        }
                        {
                            this.state.product.type == 1 &&
                            <Text style={{ fontSize: 16, color: "#034838" }}>
                                Per o.z
                            </Text>
                        }
                    </View>
                    {
                        this.state.product.salePrice != 0 &&
                        <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20 }}>
                            <Text style={{ fontSize: 20 }}>Sale Price: </Text>
                            <Text style={{ fontSize: 20, color: '#034838' }}>{ '$' + this.state.product.salePrice }</Text>
                        </View>
                    }
                    <ScrollView style={{ height: '30%' }}>
                        <Text style={{ paddingHorizontal: 20, lineHeight: 18 }} >
                        { this.state.product.description.replace(/<\/?[^>]+(>|$)/g, "") }
                        </Text>
                    </ScrollView>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this.onAddCart()}>
                    <Text style={{ color: '#ffffff', fontSize: 16, zIndex: 10000 }}>
                        ADD TO ORDER
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    onAddCart() {
        this.props.cartAction.addProduct(this.state);
        this.props.navigation.navigate('Cart');
        this.props.screenAction.pushScreen("Cart");
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        flex: 1
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 2,
        resizeMode: 'contain',
    },
    price: {
        fontSize: 24,
        marginRight: 10
    },
    button: {
        backgroundColor: '#034838',
        borderRadius: 5,
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 20,
        marginBottom: 20
    }
})

export default connect(
    state => ({
        product: state.product.product,
        screens: state.screen.screens
    }),
    dispatch => ({
        productAction: bindActionCreators(productAction, dispatch),
        cartAction: bindActionCreators(cartAction, dispatch),
        screenAction: bindActionCreators(screenAction, dispatch)
    })
)(Product);