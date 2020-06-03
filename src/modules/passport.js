import WooCommerceAPI from 'react-native-woocommerce-api'

var wc_api = new WooCommerceAPI({
    url: 'https://weedora.ca',
    ssl: true,
    consumerKey: 'ck_f00643b243d360484c441f1a96d62cbe03cf4584',
    consumerSecret: 'cs_dc029b0bd36b48b387983d2bfe7fc7a6521b61a4',
    wpAPI: true,
    version: 'wc/v3',
    queryStringAuth: true
});

export {
    wc_api
}