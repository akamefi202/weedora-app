import React, {Component} from 'react'
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native'
import {
    RaisedTextButton
} from 'react-native-material-buttons'
import {
    TextField
} from 'react-native-material-textfield'
import { withNavigationFocus } from 'react-navigation';
import { showMessage } from 'react-native-flash-message';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as profileAction from '../store/profile/actions';
import * as screenAction from '../store/screen/actions';

import Header from '../components/Header';

class Profile extends Component{
    static navigationOptions = {
        title: "My Profile",
        header: props => <Header {...props} />
    };
    
    constructor(props){
        super(props)
        this.state={
            fullName: this.props.profile.fullName,
            phoneNumber: this.props.profile.phoneNumber,
            address: this.props.profile.address,
            email: this.props.profile.email,
            profileUpdateFlag: false
        }

        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);

        this.fullNameRef = this.updateRef.bind(this, 'fullName');
        this.phonenNumberRef = this.updateRef.bind(this, 'phoneNumber');
        this.emailRef = this.updateRef.bind(this, 'email');
        this.addressRef = this.updateRef.bind(this, 'address');
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.profileUpdateFlag != nextProps.profileUpdateFlag) {
            return {
                fullName: nextProps.profile.fullName,
                phoneNumber: nextProps.profile.phoneNumber,
                email: nextProps.profile.email,
                address: nextProps.profile.address,
                profileUpdateFlag: nextProps.profileUpdateFlag
            };
        }
        return null;
    }
    /*
    componentDidUpdate(prevProps, prevState) {
        if (prevState.fullName != this.props.profile.fullName) {
            this.setState({ fullName: this.props.profile.fullName });
        }
        if (prevState.phoneNumber != this.props.profile.phoneNumber) {
            this.setState({ phoneNumber: this.props.profile.phoneNumber });
        }
        if (prevState.email != this.props.profile.email) {
            this.setState({ email: this.props.profile.email });
        }
        if (prevState.address != this.props.profile.address) {
            this.setState({ address: this.props.profile.address });
        }
    }
    */

    render(){
        let { errors = {} } = this.state;
        
        return(
            <KeyboardAvoidingView behavior={Platform.OS == 'ios'? "padding": "height"}>            
                <ScrollView style={{ backgroundColor: '#ffffff' }}>
                    <View style={styles.container}>
                        <Image style={{ width: '100%', height: undefined, aspectRatio: 2 }} source={require('../assets/weedora.png')} />
                        <View style={{ paddingVertical: 40, paddingHorizontal: 40 }}>
                            <TextField 
                                label="Full Name"         
                                ref={this.fullNameRef}
                                defaultValue={this.state.fullName}
                                autoCorrect={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                error={errors.fullName}
                                inputContainerStyle={styles.textField}
                                containerStyle={{ marginBottom: 20 }}
                                tintColor="#034838"
                            />
                            <TextField 
                                label="Phone Number"         
                                ref={this.phonenNumberRef}
                                keyboardType='phone-pad'
                                defaultValue={this.state.phoneNumber}
                                enablesReturnKeyAutomatically={true}
                                autoCorrect={false}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                error={errors.phoneNumber}
                                inputContainerStyle={styles.textField}
                                containerStyle={{ marginBottom: 20 }}
                                tintColor="#034838"
                            />
                            <TextField 
                                ref={this.emailRef}
                                defaultValue={this.state.email}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoCorrect={false}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                label='Email'
                                error={errors.email}
                                inputContainerStyle={styles.textField}
                                containerStyle={{ marginBottom: 20 }}
                                tintColor="#034838"
                            />
                            <TextField 
                                label="Address"   
                                ref={this.addressRef}
                                defaultValue={this.state.address}
                                autoCorrect={false}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                error={errors.address}
                                inputContainerStyle={styles.textField}
                                containerStyle={{ marginBottom: 20 }}
                                tintColor="#034838"
                            />
                            <RaisedTextButton
                                onPress={this.onSubmit}
                                title='update'
                                color='#034838'
                                titleColor='white'
                                style={{ height: 50, marginTop: 40 }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    onFocus() {
        let { errors = {} } = this.state;
        
        for (let name in errors) {
            let ref = this[name];
    
            if (ref && ref.isFocused()) {
                delete errors[name];
            }
        }
  
        this.setState({ errors });
      }
  
    onChangeText(text) {
        ['fullName', 'phoneNumber', 'email', 'address']
            .map((name) => ({ name, ref: this[name] }))
            .forEach(({ name, ref }) => {
                if (ref.isFocused()) {
                    this.setState({ [name]: text });
                }
            });
    }

    onSubmit() {
        let errors = {};

        ['fullName', 'phoneNumber', 'email', 'address']
            .forEach((name) => {
                let value = this[name].value();

                if (!value) {
                    errors[name] = 'Should not be empty';
                }
            });
        
        if (Object.keys(errors).length == 0) {
            this.props.profileAction.updateProfile(this.state);

            this.props.navigation.navigate('Home');
            this.props.screenAction.pushScreen("Home");
            showMessage({ message: 'Profile Updated...', type: 'success' });
        } else {
            this.setState({ errors });
        }
    }

    updateRef(name, ref) {
        this[name] = ref;
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'flex-end'
    },
    textField: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ffffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
    }
})

export default connect(
    state => ({
        profile: state.profile.profile,
        profileUpdateFlag: state.profile.profileUpdateFlag,
        screens: state.screen.screens
    }),
    dispatch => ({
        profileAction: bindActionCreators(profileAction, dispatch),
        screenAction: bindActionCreators(screenAction, dispatch)
    })
)(Profile);