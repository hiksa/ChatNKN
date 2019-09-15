import * as React from 'react';
import {View} from 'react-native';
import RNRecaptcha from 'rn-recaptcha';

import {Layout, Text} from 'react-native-ui-kitten';

export interface Props {
  address: string;
  userId: string;
  faucetLoaded: boolean;
  componentId: string;
  attemptClaim: Function;
  claimSuccess: Function;
  claimFail: Function;
}

interface State {}

class Faucet extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
  }

  onMessage = async (event: any) => {
    if (event && event.nativeEvent.data) {
      const token = event.nativeEvent.data;
      console.log('token: ' + token);

      if (token != 'expired') {
        const url = `https://nknfaucet.herokuapp.com/api/values?address=${this.props.address}`;
        console.log(url);

        // var formBody = `${encodeURIComponent('g-recaptcha-response')}=${encodeURIComponent(token)}`
        // console.log(formBody);

        const request = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
        };

        console.log(request);

        let res = await fetch(url, request);
        if (!res.ok) {
          console.log(res);
          const payload = {
            from: '',
            to: this.props.address,
            error: 'Faucet server error.',
            success: false,
            date: new Date(),
            isClaimTx: true,
          };

          this.props.claimFail(payload, this.props.componentId);
          return;
        }

        const json = await res.json();
        const {txId, from, amount} = json;
        const payload = {
          txId: txId,
          from: from,
          to: this.props.address,
          success: true,
          date: new Date(),
          isClaimTx: true,
          amount: amount,
        };

        console.log('claim success ', payload);

        this.props.claimSuccess(payload, this.props.componentId);

        //TODO: Add to transactions list
        // this.props.attemptClaim()

        console.log('end of on message');
      } else {
        console.log('received token expired message');
      }
    } else if (event.nativeEvent.data === 'expired') {
      console.log('this is when you expired');
    } else if (event.nativeEvent.data === 'error') {
      console.log('this is when error');
    } else {
      console.log('other');
    }
  };

  render() {
    const siteKey = '6LdDIbcUAAAAALY1XD3d19J3TowpMoRXR7IesPvX';
    const url = 'https://nknfaucet.herokuapp.com';

    return (
      <Layout style={{flex: 1, padding: 20}}>
        <Text
          category={'h3'}
          style={{
            textAlign: 'center',
          }}>
          Claim free NKN currency
        </Text>

        <RNRecaptcha siteKey={siteKey} onMessage={this.onMessage} url={url} />
      </Layout>
    );
  }
}

export default Faucet;
