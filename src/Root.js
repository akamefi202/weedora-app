import React from "react";
import {
    createAppContainer,
} from 'react-navigation';
import {
    createStackNavigator
} from 'react-navigation-stack';
import {
    createDrawerNavigator
} from 'react-navigation-drawer';

import Home from './screens/Home';
import Cart from './screens/Cart';
import Order from './screens/Order';
import Orders from './screens/Orders';
import Profile from './screens/Profile';
import Shop from './screens/Shop';
import Product from './screens/Product';
import Purchase from './screens/Purchase';

import Drawer from './components/Drawer';
import Header from './components/Header';

const StackHome = createStackNavigator({ Home: { screen: Home } });
const StackCart = createStackNavigator({ Cart: { screen: Cart } });
const StackOrder = createStackNavigator({ Order: { screen: Order } });
const StackOrders = createStackNavigator({ Orders: { screen: Orders } });
const StackProfile = createStackNavigator({ Profile: { screen: Profile } });
const StackShop = createStackNavigator({ Shop: { screen: Shop } });
const StackProduct = createStackNavigator({ Product: { screen: Product } });
const StackPurchase = createStackNavigator({ Purchase: { screen: Purchase } });

const DrawNavigator = createDrawerNavigator(
    {
        StackHome: { screen: StackHome },
        StackCart: { screen: StackCart },
        StackOrder: { screen: StackOrder },
        StackOrders: { screen: StackOrders },
        StackProfile: { screen: StackProfile },
        StackShop: { screen: StackShop },
        StackProduct: { screen: StackProduct },
        StackPurchase: { screen: StackPurchase }
    },
    {
        contentComponent: props => <Drawer {...props} />,
        drawerType: "slide",
        drawerWidth: "80%"
    }
);

/*
const DrawNavigator = createDrawerNavigator(
    {
        Home: { screen: Home,},
        Cart: { screen: Cart },
        Order: { screen: Order },
        Orders: { screen: Orders },
        Profile: { screen: Profile },
        Shop: { screen: Shop },
        Product: { screen: Product },
        Purchase: { screen: Purchase }
    },
    {
        contentComponent: props => <Drawer {...props} />,
        drawerType: "slide",
        drawerWidth: "80%"
    }
);
*/

const AppContainer = createAppContainer(DrawNavigator);

export default AppContainer;