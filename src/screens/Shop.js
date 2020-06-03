import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    FlatList,
} from 'react-native'
import {
    TextField
} from 'react-native-material-textfield'
import Svg, { Path } from 'react-native-svg';
import Spinner from 'react-native-loading-spinner-overlay';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as productAction from '../store/product/actions';

import Header from '../components/Header';
import ProductItem from '../components/ProductItem';
import * as screenAction from '../store/screen/actions';

import { wc_api } from '../modules/passport';

class Shop extends Component{
    static navigationOptions = {
        title: "Home",
        header: props => <Header {...props} />
    };

    constructor(props){
        super(props)

        this.state={
            products: [],
            searchText: '',
            loading: true
        }

        this.getProducts();
    }

    render(){
        return(
            <View style={styles.container}>
                <TextField
                    label="Search"   
                    value={this.state.searchText}
                    onChangeText={(text) => {
                        this.setState({ searchText: text });
                    }}
                    tintColor="#034838"
                    inputContainerStyle={styles.search}
                    renderLeftAccessory={() => {
                        return <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" style={{ marginLeft: 10, marginRight: 20, marginBottom: 10 }}>
                            <Path fill='#034838' d="M464,428,339.92,303.9a160.48,160.48,0,0,0,30.72-94.58C370.64,120.37,298.27,48,209.32,48S48,120.37,48,209.32s72.37,161.32,161.32,161.32a160.48,160.48,0,0,0,94.58-30.72L428,464ZM209.32,319.69A110.38,110.38,0,1,1,319.69,209.32,110.5,110.5,0,0,1,209.32,319.69Z"/>
                        </Svg>
                    }}
                />
                <ScrollView style={styles.scrollView}>
                    <View style={styles.productList}>
                    {
                        this.state.products.map((product, index) => (
                            product.name.toLowerCase().includes(this.state.searchText.toLowerCase()) &&
                            <ProductItem key={index} product={product} style={styles.product} navigation={this.props.navigation} />
                        ))
                    }
                    </View>
                </ScrollView>
                <Spinner
                    visible={this.state.loading}
                    color='#00ba52'
                />
            </View>
        )
    }

    getProducts() {
        var newProducts = [];

        wc_api.get('products', { 'category': 21, 'per_page': 100 }
        ).then(response => {

            for (var i in response) {
                var product = response[i];
                var newProduct = {
                    id: '',
                    name: '',
                    price: 0,
                    salePrice: 0,
                    weight: 0,
                    description: '',
                    image: '',
                    stock: true,
                    type: 0
                };

                newProduct.id = product.id;
                newProduct.name = product.name;
                newProduct.price = product.regular_price == ''? (product.dimensions.length == ''? 0: parseFloat(product.dimensions.length)): parseFloat(product.regular_price);
                newProduct.salePrice = product.sale_price == ''? 0: parseFloat(product.sale_price);
                newProduct.description = product.short_description;

                if (product.regular_price == '')
                    newProduct.type = 0;
                else if (product.weight == '')
                    newProduct.type = 1;
                else {
                    newProduct.type = 2;
                    newProduct.weight = parseFloat(product.weight);
                }

                if (product.images.length > 0) newProduct.image = product.images[0].src;
                if (product.stock_status == 'outofstock') newProduct.stock = false;
                 
                newProducts.push(newProduct);
            }

            this.props.productAction.updateProducts(newProducts);
            this.setState({ products: newProducts, loading: false });
        }).catch(error => {
            console.log(error);
            this.setState({ loading: false });
        })
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#ffffff',
        flex: 1
    },
    scrollView: {
    },
    productList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    product: {
        width: '48%',
        marginVertical: 5,
    },
    search: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ffffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
    }
})

export default connect(
    state => ({
        products: state.product.products,
        screens: state.screen.screens
    }),
    dispatch => ({
        productAction: bindActionCreators(productAction, dispatch),
        screenAction: bindActionCreators(screenAction, dispatch)
    })
)(Shop);