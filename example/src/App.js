import * as React from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, Platform } from 'react-native';
import WeiplCheckout from 'react-native-weipl-checkout';

export default function App() {

  const [scheme, setScheme] = React.useState();

  var [deviceId] = React.useState();

  switch (Platform.OS) {
    case 'android':
      deviceId = "androidsh2";
      break;

    case 'ios':
      deviceId = "iossh2";
      break;

    default:
      break;
  }

  return (
    <View style={styles.container}>

      <Pressable style={styles.button} onPress={initiateRequest}>
        <Text style={styles.text}>Initiate Request</Text>
      </Pressable>

      {Platform.OS === 'android' && (
        <View style={styles.fullView}>
          <Pressable style={styles.button} onPress={upiIntentAppsList}>
            <Text style={styles.text}>Get UPI Installed Apps</Text>
          </Pressable>
        </View>
      )}

      {Platform.OS === 'ios' && (
        <View style={styles.fullView}>
          <TextInput style={styles.input} placeholder="Enter UPI Scheme" value={scheme} onChangeText={setScheme} />
          <Pressable style={styles.button} onPress={checkInstalledUpiApp}>
            <Text style={styles.text}>Check UPI Scheme</Text>
          </Pressable>
        </View>
      )}

    </View>
  );

  function initiateRequest() {
    var options = {
      "features": {
        "enableAbortResponse": true,
        "enableExpressPay": true,
        "enableInstrumentDeRegistration": true,
        "enableMerTxnDetails": true
      },
      "consumerData": {
        "deviceId": deviceId,   //supported values "ANDROIDSH1" or "ANDROIDSH2" for Android, supported values "iOSSH1" or "iOSSH2" for iOS and supported values
        "token": "e210b297516dada3795a0064d436a4a2a9a9f5dd2af35977bca1a595e7b39c54b9cf0c048b78196fbcae1d7d32b758066d1492a61ae59ead772ea6088481c475",
        "paymentMode": "all",
        "merchantLogoUrl": "https://www.paynimo.com/CompanyDocs/company-logo-vertical.png",  //provided merchant logo will be displayed
        "merchantId": "L3348",
        "currency": "INR",
        "consumerId": "cust_01",
        "txnId": "1707121338063",   //Unique merchant transaction ID
        "items": [{
          "itemId": "first",
          "amount": "1",
          "comAmt": "0"
        }],
        "totalAmount": "1",
        "customStyle": {
          "PRIMARY_COLOR_CODE": "#45beaa",    // RGB and Hex and RGB supported parameter
          "SECONDARY_COLOR_CODE": "#ffffff",
          "BUTTON_COLOR_CODE_1": "#2d8c8c",
          "BUTTON_COLOR_CODE_2": "#ffffff",
        }
      }
    };

    // call SDK open method
    WeiplCheckout.open(options, responseCallback, errorCallback);
  };

  function upiIntentAppsList() {
    // call SDK upiIntentAppsList method
    WeiplCheckout.upiIntentAppsList().then((res) => {
      alert(JSON.stringify(res));
    });
  }

  function checkInstalledUpiApp() {
    // call SDK checkInstalledUpiApp method
    WeiplCheckout.checkInstalledUpiApp(scheme).then((res) => {
      alert(res);
    });
  }

  function responseCallback(res) {
    alert(JSON.stringify(res));
  }

  function errorCallback(res) {
    alert(JSON.stringify(res));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fullView: {
    width: '100%'
  },
  input: {
    width: '100%',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginTop: 6,
    marginBottom: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    fontSize: 14,
    color: '#555555'
  },
  button: {
    width: '100%',
    backgroundColor: '#45BEAA',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 12
  },
  label: {
    marginVertical: 8,
    color: '#555555'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
