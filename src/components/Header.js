import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Svg, { Rect, Polyline } from 'react-native-svg';
import { DrawerActions } from 'react-navigation-drawer';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as screenAction from '../store/screen/actions';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state={
        }
    }

    render() {
        return (
            <View style={this.props.style}>
                <View style={styles.container}>
                    {
                        this.props.back == true?
                        <TouchableOpacity style={styles.menuButton} onPress={() => this.onBack()}>
                            <Svg width='32' height='32' viewBox='0 0 512 512'>
                                <Polyline 
                                    points='328 112 184 256 328 400' 
                                    stroke='#ffffff' 
                                    fill='none' 
                                    strokeLinecap='round' 
                                    strokeLinejoin='round'
                                    strokeWidth={48}
                                />
                            </Svg>
                        </TouchableOpacity>:
                        <TouchableOpacity style={styles.menuButton} onPress={() => this.onMenu()}>
                            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <Rect width="16" height="2.73389" rx="1.36695" transform="matrix(-1 0 0 1 16 0)" fill="#ffffff"/>
                                <Rect width="16" height="2.73389" rx="1.36695" transform="matrix(-1 0 0 1 16 6.58826)" fill="#ffffff"/>
                                <Rect width="16" height="2.73389" rx="1.36695" transform="matrix(-1 0 0 1 16 13.1765)" fill="#ffffff"/>
                            </Svg>
                        </TouchableOpacity>
                        
                    }
                    <Text style={styles.title}>{this.props.scene.descriptor.options.title}</Text>
                </View>
            </View>
        );
    }

    onMenu(){
        this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    }

    onBack() {
        if (this.props.screens.length >= 2) {
            var prevScreen = this.props.screens[this.props.screens.length - 2]
            this.props.screenAction.popScreen();
            this.props.navigation.navigate(prevScreen);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 20,
        height: 50,
        backgroundColor: '#135848'
    },
    menuButton: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20,
    },
    title: {
        fontSize: 20,
        color: '#ffffff'
    },
});

export default connect(
    state => ({
        screens: state.screen.screens
    }),
    dispatch => ({
        screenAction: bindActionCreators(screenAction, dispatch)
    })
)(Header);