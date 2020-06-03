import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Animated
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import { withNavigationFocus } from 'react-navigation';
import FlashMessage, { showMessage } from 'react-native-flash-message';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as cartAction from '../store/cart/actions';
import * as screenAction from '../store/screen/actions';

import Header from '../components/Header';
import CartItem from '../components/CartItem';

const rowTranslateAnimatedValues = {};
Array(20)
    .fill('')
    .forEach((_, i) => {
        rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });


class Cart extends Component{
    static navigationOptions = {
        title: "My Cart",
        header: props => <Header back={true} {...props} />
    };

    constructor(props){
        super(props)

        this.state={
            items: this.props.items,
            totalPrice: 0
        }

        this.cartListRef = React.createRef();
    }

    /*
    componentDidUpdate(prevProps, prevState){
        if (JSON.stringify(prevProps.items) != JSON.stringify(this.props.items)) {
            this.setState({ items: this.props.items });
        }
    }
    */

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.items) != JSON.stringify(prevState.items)) {

            return {
                items: nextProps.items
            };
        }
        return null;
    }

    render(){
        return(
            <View style={styles.container}>
                {/*<ScrollView>
                    <View style={{ paddingTop: 10 }}>
                    {
                        this.state.items.map((item, index) => {
                            return <CartItem 
                                key={index} 
                                item={item} 
                                style={styles.item} 
                                onPlus={() => this.onPlus(index)} 
                                onMinus={() => this.onMinus(index)} 
                            />
                        })
                    }
                    </View>
                </ScrollView>*/}
                {
                    this.state.items.length == 0?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style = {{ fontSize: 36, color: '#c0c0c0' }}>
                            No item in cart
                        </Text>
                    </View>:
                    <SwipeListView
                        ref={this.cartListRef}
                        style={{ paddingVertical: 10 }}
                        disableRightSwipe
                        rightOpenValue={-Dimensions.get('window').width}
                        useNativeDriver={false}
                        data={this.state.items}
                        onSwipeValueChange={(swipeData) => this.onSwipeValueChange(swipeData)}
                        renderHiddenItem={() => {
                            return <View></View>;
                        }}
                        renderItem={(data, rowMap) => {
                            return <CartItem 
                                key={data.index}
                                index={data.index}
                                item={data.item} 
                                style={styles.item} 
                                onPlus={() => this.onPlus(data.index)} 
                                onMinus={() => this.onMinus(data.index)} 
                            />;
                        }}
                    />
                }
                <View>  
                    <TouchableOpacity style={styles.keepButton} onPress={() => this.onKeep()}>
                        <Text style={styles.buttonText}>
                            KEEP SHOPPING
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.bottomView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>
                            { 'Total: ' }  
                            </Text>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                            { '$' + this.getTotalPrice().toFixed(2) }
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.buyButton} onPress={() => this.onPurchase()}>
                            <Text style={styles.buttonText}>
                                BUY NOW
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlashMessage position='center' ref='cartFlashMsg' />
            </View>
        )
    }

    onSwipeValueChange(swipeData) {
        const { key, value } = swipeData;
        if (value < -Dimensions.get('window').width && !this.animationIsRunning) {
            this.animationIsRunning = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
            }).start(() => {
                const newData = this.state.items;
                const prevIndex = this.state.items.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                
                this.props.cartAction.updateCart(newData);
                this.setState({ items: newData });
                //setListData(newData);
                this.animationIsRunning = false;
            });
        }
    };

    onKeep() {
        this.props.navigation.navigate('Shop');
        this.props.screenAction.pushScreen("Shop");
    }

    onPurchase() {
        if (this.state.items.length > 0) {
            this.props.navigation.navigate('Purchase');
            this.props.screenAction.pushScreen("Purchase");
        } else {
            showMessage({ message: 'Cart is empty', type: 'warning',  })
        }
    }

    onPlus(index) {
        var items = this.state.items;
        var item = items[index];
        item.quantity += item.ozUnit;

        items[index] = item;

        this.props.cartAction.updateCart(items);
        this.setState({ items: items });
    }

    onMinus(index) {
        var items = this.state.items;
        var item = items[index];
        item.quantity -= item.ozUnit;
        if (item.quantity < 0) item.quantity = 0;

        items[index] = item;

        this.props.cartAction.updateCart(items);
        this.setState({ items: items });
    }

    getTotalPrice() {
        var totalPrice = 0;

        for (var i = 0; i < this.state.items.length; i ++) {
            var item = this.state.items[i];
            totalPrice += item.quantity * item.product.price;
        }

        //this.setState({ totalPrice: totalPrice });
        return totalPrice;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    item: {
        marginBottom: 10,
        marginHorizontal: 10
    },
    keepButton: {
        backgroundColor: '#034838',
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
        marginBottom: 30,
        marginHorizontal: 10
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 10
    },
    buyButton: {
        backgroundColor: '#404040',
        alignItems: 'center',
        padding: 15,
        borderRadius: 5
    },
    buttonText: {
        color: '#ffffff'
    },
})

export default connect(
    state => ({
        items: state.cart.items,
        screens: state.screen.screens
    }),
    dispatch => ({
        cartAction: bindActionCreators(cartAction, dispatch),
        screenAction: bindActionCreators(screenAction, dispatch)
    })
)(withNavigationFocus(Cart));