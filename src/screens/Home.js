import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native'
import FlashMessage from 'react-native-flash-message';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as productAction from '../store/product/actions';
import * as screenAction from '../store/screen/actions';

import Header from '../components/Header';

import { wc_api } from '../modules/passport';


class Home extends Component{
    static navigationOptions = {
        title: "Home",
        header: props => <Header {...props} />
    };

    constructor(props){
        super(props)
        this.state={
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableHighlight style={{ borderRadius: 10 }} onPress={() => this.onShop()}>
                    <View>
                        <View style={styles.topView}>
                            <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold' }}>Click to Order Now!</Text>
                        </View>
                        <View style={styles.bottomView}>
                            <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold' }}>Strains</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <FlashMessage position='center' ref="homeFlashMsg" />
            </View>
        )
    }

    onShop() {
        this.props.navigation.navigate("Shop");
        this.props.screenAction.pushScreen("Shop");
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1
    },
    topView: {
        backgroundColor: '#034838', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10, 
        paddingVertical: 10,
        height: 200
    },
    bottomView: {
        backgroundColor: '#135848', 
        alignItems: 'center', 
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10, 
        paddingVertical: 10
    }
})

export default connect(
    state => ({
        screens: state.screen.screens
    }),
    dispatch => ({
        productAction: bindActionCreators(productAction, dispatch),
        screenAction: bindActionCreators(screenAction, dispatch)
    })
)(Home);