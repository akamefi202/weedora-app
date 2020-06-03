import React, {Component} from 'react'
import {
    View,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native'
import {
    RaisedTextButton
} from 'react-native-material-buttons'
import {
    TextField
} from 'react-native-material-textfield'
import Svg, { Path } from 'react-native-svg'
import ModalDropdown from 'react-native-modal-dropdown'
import { withNavigationFocus } from 'react-navigation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Spinner from 'react-native-loading-spinner-overlay'
import Modal from 'react-native-modal';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
 
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as profileAction from '../store/profile/actions';
import * as cartAction from '../store/cart/actions';
import * as orderAction from '../store/order/actions';
import * as screenAction from '../store/screen/actions';

import Header from '../components/Header';

import { wc_api } from '../modules/passport';

class Purchase extends Component{
    static navigationOptions = {
        title: "Purchase",
        header: props => <Header back={true} {...props} />
    };

    cities = [
        'Toronto',
        'Mississauga',
        'North York',
        'Scarborough',
        'Brampton',
        'Etobicoke',
        'Durham Region'
    ];

    deliveryTimes = [
        '12 to 5 PM',
        '5 to 9 PM'
    ];

    constructor(props){
        super(props)
        this.state={
            fullName: this.props.profile.fullName,
            phoneNumber: this.props.profile.phoneNumber,
            address: this.props.profile.address,
            email: this.props.profile.email,
            suite: '',
            city: '',
            postCode: '',
            deliveryTime: '',
            majorInter: '',
            deliveryDetails: '',
            uploading: false,
            error: '',
            autoPlace: false,
            profileUpdateFlag: false
        }

        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);

        this.fullNameRef = this.updateRef.bind(this, 'fullName');
        this.phonenNumberRef = this.updateRef.bind(this, 'phoneNumber');
        //this.addressRef = this.updateRef.bind(this, 'address');
        this.emailRef = this.updateRef.bind(this, 'email');
        this.suiteRef = this.updateRef.bind(this, 'suite');
        //this.cityRef = this.updateRef.bind(this, 'city');
        this.postCodeRef = this.updateRef.bind(this, 'postCode');
        //this.deliveryTimeRef = this.updateRef.bind(this, 'deliveryTime');
        this.majorInterRef = this.updateRef.bind(this, 'majorInter');
        this.deliveryDetailsRef = this.updateRef.bind(this, 'deliveryDetails');
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
        if (JSON.stringify(prevProps.profile) != JSON.stringify(this.props.profile)) {
            this.setState({ 
                fullName: this.props.profile.fullName,
                phoneNumber: this.props.profile.phoneNumber,
                email: this.props.profile.email,
                address: this.props.profile.address,
            });
        }

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
                <ScrollView style={{ backgroundColor: '#ffffff' }} keyboardShouldPersistTaps='always'>
                    <View style={styles.container}>
                        <Image style={{ width: '100%', height: undefined, aspectRatio: 2 }} source={require('../assets/weedora.png')} />
                        <View style={{ paddingVertical: 40, paddingHorizontal: 40 }}>
                            <TextField 
                                label="Full Name"         
                                ref={this.fullNameRef}
                                defaultValue={this.state.fullName}
                                autoCorrect={false}
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
                                autoCorrect={false}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                error={errors.phoneNumber}
                                inputContainerStyle={styles.textField}
                                containerStyle={{ marginBottom: 20 }}
                                tintColor="#034838"
                            />
                            <TextField 
                                label='Email'
                                ref={this.emailRef}
                                defaultValue={this.state.email}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoCorrect={false}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                error={errors.email}
                                inputContainerStyle={styles.textField}
                                containerStyle={{ marginBottom: 20 }}
                                tintColor="#034838"
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ autoPlace: true })
                                }}
                                style={{
                                    paddingVertical: 20,
                                    paddingHorizontal: 10,
                                    backgroundColor: '#ffffff',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.5,
                                    marginBottom: 20,
                                }}
                            >
                            {
                                this.state.address == ''?
                                <Text style={{ fontSize: 16, color: '#808080' }} numberOfLines={1}>
                                    Address
                                </Text>:
                                <Text style={{ fontSize: 16 }} numberOfLines={1}>
                                    { this.state.address }
                                </Text>
                            }    
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                <TextField 
                                    label="Suite"   
                                    ref={this.suiteRef}
                                    value={this.state.suite}
                                    autoCorrect={false}
                                    onFocus={this.onFocus}
                                    onChangeText={this.onChangeText}
                                    inputContainerStyle={styles.textField}
                                    containerStyle={{ flex: 1, marginRight: 10 }}
                                    tintColor="#034838"
                                />
                                <ModalDropdown
                                    style={{ 
                                        shadowOffset: { width: 0, height: 0 }, 
                                        shadowOpacity: 0.5,
                                        backgroundColor: '#ffffff', 
                                        flex: 1, 
                                        marginBottom: 10 
                                    }}
                                    dropdownStyle={{ 
                                        shadowOffset: { width: 0, height: 0 }, 
                                        shadowOpacity: 0.5, 
                                        padding: 10, 
                                        width: Dimensions.get('window').width / 2 - 45, 
                                        height: 34 * 7 + 20 
                                    }}
                                    onSelect={(index) => {
                                        this.setState({ city: this.cities[index] });
                                    }}
                                    textStyle = {{ fontSize: 12, color: "#969696" }}
                                    options={this.cities}
                                    renderSeparator={() => { return null; }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between", paddingVertical: 13, paddingHorizontal: 10 }}>
                                        {
                                            this.state.city == ""?
                                            <Text style={{ color: "#969696", fontSize: 16 }}>{ 'City' }</Text>:
                                            <Text style={{ fontSize: 16 }}>{ this.state.city }</Text>
                                        }
                                        <Svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                                            <Path fillRule="evenodd" clipRule="evenodd" d="M1.27125 0.227806C0.980433 -0.0759354 0.508928 -0.0759354 0.218112 0.227806C-0.0727043 0.531547 -0.0727043 1.02401 0.218112 1.32775L4.47343 5.77219C4.76425 6.07594 5.23575 6.07594 5.52657 5.77219L9.78189 1.32775C10.0727 1.02401 10.0727 0.531547 9.78189 0.227806C9.49107 -0.0759354 9.01957 -0.0759354 8.72875 0.227806L4.99796 4.12441L1.27125 0.227806Z" fill="#969696"/>
                                        </Svg>
                                    </View>
                                </ModalDropdown>
                            </View>
                            <TextField 
                                label="Postal Code"   
                                ref={this.postCodeRef}
                                value={this.state.postCode}
                                autoCorrect={false}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                error={errors.postCode}
                                inputContainerStyle={styles.textField}
                                containerStyle={{ marginBottom: 20 }}
                                tintColor="#034838"
                            />
                            <ModalDropdown
                                style={{ 
                                    shadowOffset: { width: 0, height: 0 }, 
                                    shadowOpacity: 0.5, 
                                    backgroundColor: '#ffffff', 
                                    marginBottom: 20, 
                                    paddingTop: 20 
                                }}
                                dropdownStyle={{ 
                                    shadowOffset: { width: 0, height: 0 }, 
                                    shadowOpacity: 0.5, 
                                    padding: 10, 
                                    width: Dimensions.get('window').width - 80, 
                                    height: 34 * 2 + 20
                                }}
                                onSelect={(index) => {
                                    this.setState({ deliveryTime: this.deliveryTimes[index] });
                                }}
                                textStyle = {{ fontSize: 16, color: "#969696" }}
                                options={this.deliveryTimes}
                                renderSeparator={() => { return null; }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between", paddingVertical: 13, paddingHorizontal: 10}}>
                                    {
                                        this.state.deliveryTime == ""?
                                        <Text style={{ color: "#969696", fontSize: 16 }}>{ 'Select Delivery Time' }</Text>:
                                        <Text style={{ fontSize: 16 }}>{this.state.deliveryTime}</Text>
                                    }
                                    <Svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                                        <Path fillRule="evenodd" clipRule="evenodd" d="M1.27125 0.227806C0.980433 -0.0759354 0.508928 -0.0759354 0.218112 0.227806C-0.0727043 0.531547 -0.0727043 1.02401 0.218112 1.32775L4.47343 5.77219C4.76425 6.07594 5.23575 6.07594 5.52657 5.77219L9.78189 1.32775C10.0727 1.02401 10.0727 0.531547 9.78189 0.227806C9.49107 -0.0759354 9.01957 -0.0759354 8.72875 0.227806L4.99796 4.12441L1.27125 0.227806Z" fill="#969696"/>
                                    </Svg>
                                </View>
                            </ModalDropdown>
                            <TextField 
                                label="Major Intersections"   
                                ref={this.majorInterRef}
                                value={this.state.majorInter}
                                autoCorrect={false}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                error={errors.majorInter}
                                inputContainerStyle={styles.textField}
                                containerStyle={{ marginBottom: 20 }}
                                tintColor="#034838"
                            />
                            <TextField 
                                label="Delivery Details"   
                                ref={this.deliveryDetailsRef}
                                value={this.state.deliveryDetails}
                                autoCorrect={false}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                error={errors.deliveryDetails}
                                inputContainerStyle={styles.textField}
                                containerStyle={{ marginBottom: 20 }}
                                tintColor="#034838"
                            />
                            {
                                this.state.error != '' &&
                                <Text style={{ fontSize: 16, color: '#c00000', marginBottom: 20 }}>
                                { this.state.error }
                                </Text>
                            }
                            <View style={{ marginTop: 40, flexDirection: 'row'  }}>
                                <RaisedTextButton
                                    onPress={() => this.onBack()}
                                    title='back'
                                    color='#034838'
                                    titleColor='#ffffff'
                                    style={{ height: 50, flex: 1, marginRight: 10 }}
                                />    
                                <RaisedTextButton
                                    onPress={this.onSubmit}
                                    title='done'
                                    color='#ffffff'
                                    titleColor='#034838'
                                    style={{ height: 50, flex: 1, borderColor: '#034838', borderWidth: 1 }}
                                />
                            </View>
                        </View>
                        <Spinner
                            visible={this.state.uploading}
                            color='#00ba52'
                        />
                        <Modal
                            isVisible={this.state.autoPlace}
                            onBackdropPress={() => { this.setState({ autoPlace: false }) }}
                            animationIn='slideInDown'
                            animationOut='slideOutUp'
                        >
                            <GooglePlacesAutocomplete
                                placeholder='Search'
                                onPress={(data, details = null) => {
                                    this.setState({ 
                                        address: data.description,
                                        autoPlace: false 
                                    });
                                }}
                                query={{
                                    key: 'AIzaSyA60NPQxo_CXYcD8vn5wAhbS78k4Lo1g2U',
                                    language: 'en',
                                    type: 'address',
                                    components: 'country:ca'
                                }}
                                styles={{
                                    listView: {
                                        backgroundColor: '#ffffff'
                                    },
                                    textInput: {
                                        color: '#000000'
                                    }
                                }}
                            />
                        </Modal>
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
        ['fullName', 'phoneNumber', 'email', /*'address'*/, 'suite', /*'city'*/, 'postCode', /*'deliveryTime'*/, 'majorInter', 'deliveryDetails']
        .forEach((name) => {
            var ref = this[name];
            if (ref.isFocused()) {
                this.setState({ [name]: text });
            }
        })
    }

    onSubmit() {
        let errors = {};

        ['fullName', 'phoneNumber', 'email', /*'address'*/, /*'suite'*/, /*'city',*/ 'postCode', /*'deliveryTime',*/ 'majorInter', 'deliveryDetails']
            .forEach((name) => {
                let value = this[name].value();

                if (!value) {
                    errors[name] = 'Should not be empty';
                }
            });
        
        if (this.state.address == '' || this.state.city == '' || this.state.deliveryTime == '') {
            this.setState({ error: 'Should input all fields'});
            setTimeout(() => {
                this.setState({ error: '' });
            }, 5000);
            errors['error'] = 'Should input all fields';
        }

        if (Object.keys(errors).length == 0) {
            // send email to the customer
            this.sendEmail();

            // update profile
            this.props.profileAction.updateProfile(this.state);

            // add order to server and store 
            this.addOrder();
            
            // clear cart
            this.props.cartAction.updateCart([]);
        } else {
            this.setState({ errors });
        }
    }

    onBack() {
        this.props.navigation.navigate('Cart');
        this.props.screenAction.pushScreen("Cart");
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    getTotalPrice(items) {
        var totalPrice = 0;

        for (var i = 0; i < items.length; i ++) {
            var item = items[i];
            totalPrice += item.quantity * item.product.price;
        }

        return totalPrice;
    }

    sendEmail() {
        var mListProducts = [];
        var totalPrice = 0;

        for (var i in this.props.cartItems) {
            var product = {};
            var cartItem = this.props.cartItems[i];

            product.id = parseInt(cartItem.product.id);
            product.image = cartItem.product.image;
            product.productName = cartItem.product.name;
            product.productPrice = (cartItem.ozUnit * cartItem.product.price).toString();
            product.productQty = cartItem.quantity;

            mListProducts.push(product);
            totalPrice += cartItem.quantity * cartItem.product.price;
        }


        // disable certificate validation(SSL)
        /*const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });*/

        /*
        axios.post('https://email.weedora.ca/api/emailWeedora', {
            address: this.state.address,
            city: this.state.city,
            comments: this.state.deliveryDetails,
            deliveryTime: this.state.deliveryTime,
            email: this.state.email,
            mListProducts: mListProducts,
            majorIntersections: this.state.majorInter,
            name: this.state.fullName,
            phone: this.state.phoneNumber,
            postalCode: this.state.phoneNumber,
            suite: this.state.suite,    
            totalPrice: totalPrice.toString()
        }).then((response) => {
            //console.log(response);
        }).catch((error) => {
            console.log(error);
        })
        */

        this.setState({ uploading: true });

        RNFetchBlob.config({
            trusty: true
        }).fetch('POST', 'https://email.weedora.ca/api/emailWeedora', {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        JSON.stringify({
            address: this.state.address,
            city: this.state.city,
            comments: this.state.deliveryDetails,
            deliveryTime: this.state.deliveryTime,
            email: this.state.email,
            mListProducts: mListProducts,
            majorIntersections: this.state.majorInter,
            name: this.state.fullName,
            phone: this.state.phoneNumber,
            postalCode: this.state.postCode,
            suite: this.state.suite,    
            totalPrice: totalPrice.toString()
        })).then((response) => {
            console.log(response);

            // hide spinner
            this.setState({ uploading: false });

            // navigate to home screen
            showMessage({ message: 'Order sent', type: 'success' });
            this.props.navigation.navigate('Home');
            this.props.screenAction.pushScreen("Home");
        }).catch((error) => {
            console.log(error);
        })
    }

    addOrder() {
        // add order to the orders list
        var order = {};
        order.fullName = this.state.fullName;
        order.deliveryDetails = this.state.deliveryDetails;
        order.items = this.props.cartItems;
        order.totalPrice = this.getTotalPrice(this.props.cartItems);

        this.props.orderAction.addOrder(order);

        // prepare data for uploading
        var lineItems = [];
        for (var i in this.props.cartItems) {
            var lineItem = {};
            var cartItem = this.props.cartItems[i];

            lineItem.product_id = parseInt(cartItem.product.id);
            lineItem.quantity = cartItem.quantity;
            lineItems.push(lineItem);
        }

        const data = {
            payment_method: "bacs",
            payment_method_title: "Direct Bank Transfer",
            set_paid: true,
            billing: {
                first_name: this.state.fullName,
                last_name: this.state.fullName,
                address_1: this.state.address,
                address_2: "",
                city: this.state.city,
                state: this.st,
                postcode: this.state.postCode,
                country: "CA",
                email: this.state.email,
                phone: this.state.phoneNumber
            },
            shipping: {
                first_name: this.state.fullName,
                last_name: this.state.fullName,
                address_1: this.state.address,
                address_2: "",
                city: this.state.city,
                state: "CA",
                postcode: this.state.postCode,
                country: "CA"
            },
            line_items: lineItems,
            shipping_lines: [
                {
                    method_id: "flat_rate",
                    method_title: "Flat Rate",
                    total: '10'
                }
            ]
        };
        
        // upload order to the server
        // showing spinner
        /*
        this.setState({ uploading: true });

        wc_api.post("orders", data
        ).then((response) => {
            //console.log(response.data);

            // hide spinner
            this.setState({ uploading: false });

            // navigate to home screen
            showMessage({ message: 'Order sent', type: 'success' });
            this.props.navigation.navigate('Home');
            this.props.screenAction.pushScreen("Home");
        }).catch((error) => {
            console.log(error.response.data);

            this.setState({ uploading: false });
        });
        */
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff'
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
        cartItems: state.cart.items,
        screens: state.screen.screens
    }),
    dispatch => ({
        profileAction: bindActionCreators(profileAction, dispatch),
        cartAction: bindActionCreators(cartAction, dispatch),
        orderAction: bindActionCreators(orderAction, dispatch),
        screenAction: bindActionCreators(screenAction, dispatch)
    })
)(withNavigationFocus(Purchase));