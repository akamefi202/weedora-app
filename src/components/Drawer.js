import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import Svg, { Polygon, Circle, Polyline, Path, Rect, Line } from 'react-native-svg';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as profileAction from '../store/profile/actions';
import * as screenAction from '../store/screen/actions';

class Drawer extends Component {
    constructor(props) {
        super(props)
        
        this.state={
            image: require('../assets/profile.png'),
            email: this.props.profile.email,
            fullName: this.props.profile.fullName,
            index: 0
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.profile.email) != JSON.stringify(prevState.email) ||
            JSON.stringify(nextProps.profile.fullName) != JSON.stringify(prevState.fullName)) {

            return {
                fullName: nextProps.profile.fullName,
                email: nextProps.profile.email
            };
        }
        return null;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profile}>
                    <Image source={this.state.image} style={styles.image} />
                    <View style={{  }}>
                        <Text style={{ fontSize: 16 }}>{ this.state.fullName == ''? 'Full Name': this.state.fullName }</Text>
                        <Text style={{ color: '#034838' }}>{ this.state.email == ''? 'Email': this.state.email }</Text>
                    </View>
                </View>
                {
                    this.state.index == 0?
                    <TouchableOpacity style={styles.selButton} onPress={() => this.onHome()}>
                        <Svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 512 512' color='#ff0000'>
                            <Polygon fill='#034838' points='416 174.74 416 48 336 48 336 106.45 256 32 0 272 64 272 64 480 208 480 208 320 304 320 304 480 448 480 448 272 512 272 416 174.74' />
                        </Svg>
                        <Text style={styles.selText}>Home</Text>
                    </TouchableOpacity>:
                    <TouchableOpacity style={styles.unselButton} onPress={() => this.onHome()}>
                        <Svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 512 512' color='#ff0000'>
                            <Polygon points='416 174.74 416 48 336 48 336 106.45 256 32 0 272 64 272 64 480 208 480 208 320 304 320 304 480 448 480 448 272 512 272 416 174.74' />
                        </Svg>
                        <Text style={styles.unselText}>Home</Text>
                    </TouchableOpacity>
                }
                {
                    this.state.index == 1?
                    <TouchableOpacity style={styles.selButton} onPress={() => this.onCart()}>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                        <Circle cx="176" cy="416" r="16" fill='none' stroke='#034838' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' />
                        <Circle cx="400" cy="416" r="16" fill='none' stroke='#034838' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' />
                        <Polyline points="48 80 112 80 160 352 416 352" fill='none' stroke='#034838' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' />
                        <Path d="M160,288H409.44a8,8,0,0,0,7.85-6.43l28.8-144a8,8,0,0,0-7.85-9.57H128" fill='none' stroke='#034838' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' />
                    </Svg>
                    <Text style={styles.selText}>My Cart</Text>
                    </TouchableOpacity>:
                    <TouchableOpacity style={styles.unselButton} onPress={() => this.onCart()}>
                        <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                            <Circle cx="176" cy="416" r="16" fill='none' stroke='#000000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' />
                            <Circle cx="400" cy="416" r="16" fill='none' stroke='#000000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' />
                            <Polyline points="48 80 112 80 160 352 416 352" fill='none' stroke='#000000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' />
                            <Path d="M160,288H409.44a8,8,0,0,0,7.85-6.43l28.8-144a8,8,0,0,0-7.85-9.57H128" fill='none' stroke='#000000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' />
                        </Svg>
                        <Text style={styles.unselText}>My Cart</Text>
                    </TouchableOpacity>
                }
                {
                    this.state.index == 2?
                    <TouchableOpacity style={styles.selButton} onPress={() => this.onOrders()}>
                        <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                            <Rect x="96" y="48" width="320" height="416" rx="48" ry="48" fill='none' stroke='#034838' strokeLinejoin='round' strokeWidth='32' />
                            <Line x1="176" y1="128" x2="336" y2="128" fill='none' stroke='#034838' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' />
                            <Line x1="176" y1="208" x2="336" y2="208" fill='none' stroke='#034838' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' />
                            <Line x1="176" y1="288" x2="256" y2="288" fill='none' stroke='#034838' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' />
                        </Svg>
                        <Text style={styles.selText}>Recent Orders</Text>
                    </TouchableOpacity>:
                    <TouchableOpacity style={styles.unselButton} onPress={() => this.onOrders()}>
                        <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                            <Rect x="96" y="48" width="320" height="416" rx="48" ry="48" fill='none' stroke='#000000' strokeLinejoin='round' strokeWidth='32' />
                            <Line x1="176" y1="128" x2="336" y2="128" fill='none' stroke='#000000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' />
                            <Line x1="176" y1="208" x2="336" y2="208" fill='none' stroke='#000000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' />
                            <Line x1="176" y1="288" x2="256" y2="288" fill='none' stroke='#000000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' />
                        </Svg>
                        <Text style={styles.unselText}>Recent Orders</Text>
                    </TouchableOpacity>
                }
                {
                    this.state.index == 3?
                    <TouchableOpacity style={styles.selButton} onPress={() => this.onProfile()}>
                        <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                            <Path d="M344,144c-3.92,52.87-44,96-88,96s-84.15-43.12-88-96c-4-55,35-96,88-96S348,90,344,144Z" fill='none' stroke='#034838' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' />
                            <Path d="M256,304c-87,0-175.3,48-191.64,138.6C62.39,453.52,68.57,464,80,464H432c11.44,0,17.62-10.48,15.65-21.4C431.3,352,343,304,256,304Z" fill='none' stroke='#034838' strokeMiterlimit='10' strokeWidth='32' />
                        </Svg>
                        <Text style={styles.selText}>My Profile</Text>
                    </TouchableOpacity>:
                    <TouchableOpacity style={styles.unselButton} onPress={() => this.onProfile()}>
                        <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                            <Path d="M344,144c-3.92,52.87-44,96-88,96s-84.15-43.12-88-96c-4-55,35-96,88-96S348,90,344,144Z" fill='none' stroke='#000000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' />
                            <Path d="M256,304c-87,0-175.3,48-191.64,138.6C62.39,453.52,68.57,464,80,464H432c11.44,0,17.62-10.48,15.65-21.4C431.3,352,343,304,256,304Z" fill='none' stroke='#000000' strokeMiterlimit='10' strokeWidth='32' />
                        </Svg>
                        <Text style={styles.unselText}>My Profile</Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }

    onHome(){
        this.setState({ index: 0 });
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate("Home");
        this.props.screenAction.pushScreen("Home");
    }

    onCart(){
        this.setState({ index: 1 });
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate("Cart");
        this.props.screenAction.pushScreen("Cart");
    }

    onOrders(){
        this.setState({ index: 2 });
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate("Orders");
        this.props.screenAction.pushScreen("Orders");
    }

    onProfile(){
        this.setState({ index: 3 });
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate("Profile");
        this.props.screenAction.pushScreen("Profile");
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        height: "100%"
    },
    profile: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingTop: 40,
        paddingBottom: 40
    },
    image: {
        width: 60, 
        height: 60, 
        borderRadius: 100, 
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#034838'
    },
    unselButton: {
        flexDirection: 'row',
        alignItems: "center",
        paddingVertical: 10,
        paddingLeft: 20,
        marginHorizontal: 10,
    },
    selButton: {
        flexDirection: 'row',
        alignItems: "center",
        paddingVertical: 10,
        paddingLeft: 20,
        marginHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#d1efde',
    },
    selText: {
        color: "#034838",
        fontSize: 16,
        paddingLeft: 10
    },
    unselText: {
        color: "#000000",
        fontSize: 16,
        paddingLeft: 10
    }
})

export default connect(
    state => ({
        profile: state.profile.profile,
        screens: state.screen.screens
    }),
    dispatch => ({
        profileAction: bindActionCreators(profileAction, dispatch),
        screenAction: bindActionCreators(screenAction, dispatch)
    })
)(Drawer);
