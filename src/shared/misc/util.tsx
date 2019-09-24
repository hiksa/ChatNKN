const protocol = require('nkn-wallet/lib/crypto/protocol');
import {hexToBytes} from 'nkn-client/lib/crypto/tools';

export const getAddressFromPubKey = (pubKey: string) => {
  const signatureRedeem = protocol.publicKeyToSignatureRedeem(pubKey);
  const programHashString = protocol.hexStringToProgramHash(signatureRedeem);
  const nknAddress = protocol.programHashStringToAddress(programHashString);
  return nknAddress;
};

export const unmarshalCoinbase = (hexString: string) => {
  let result = {
    sender: [],
    recipient: [],
    amount: 0,
  };

  const data = hexToBytes(hexString);
  const length = data.length;
  let index = 0;

  while (index < length) {
    let preIndex = index;
    let wire = 0;
    for (let shift = 0; ; shift += 7) {
      if (shift >= 64) {
        return 'ErrIntOverflowTransaction';
      }

      if (index >= length) {
        return 'Error Unexpected length';
      }

      let b = data[index];
      index++;
      wire |= (b & 0x7f) << shift;
      if (b < 0x80) {
        break;
      }
    }

    let fieldNum = wire >> 3;
    let wireType = wire & 0x7;

    if (wireType == 4) {
      debugger;
      return '';
    }

    if (fieldNum <= 0) {
      debugger;
      return '';
    }

    switch (fieldNum) {
      case 1: {
        if (wireType != 2) {
          debugger;
          return '';
        }

        let byteLength = 0;
        for (let shift = 0; ; shift += 7) {
          if (shift >= 64) {
            return 'ErrIntOverflowTransaction';
          }

          if (index >= length) {
            return 'Error Unexpected length';
          }

          let b = data[index];
          index++;
          byteLength |= (b & 0x7f) << shift;
          if (b < 0x80) {
            break;
          }
        }

        if (byteLength < 0) {
          debugger;
          return '';
        }

        let postIndex = index + byteLength;
        if (postIndex < 0) {
        }

        if (postIndex > length) {
          debugger;
          return '';
        }

        result.sender = result.sender.concat(data.slice(index, postIndex));
        if (!result.sender) {
          result.sender = [];
        }

        index = postIndex;
        break;
      }

      case 2: {
        if (wireType != 2) {
          debugger;
          return '';
        }

        let byteLength = 0;
        for (let shift = 0; ; shift += 7) {
          if (shift >= 64) {
            return 'ErrIntOverflowTransaction';
          }

          if (index >= length) {
            return 'Error Unexpected length';
          }

          let b = data[index];
          index++;
          byteLength |= (b & 0x7f) << shift;
          if (b < 0x80) {
            break;
          }
        }

        if (byteLength < 0) {
          debugger;
          return '';
        }

        let postIndex = index + byteLength;
        if (postIndex < 0) {
          debugger;
          return '';
        }

        if (postIndex > length) {
          debugger;
          return '';
        }

        result.recipient = result.recipient.concat(
          data.slice(index, postIndex),
        );
        if (!result.recipient) {
          result.recipient = [];
        }

        index = postIndex;

        break;
      }

      case 3: {
        if (wireType != 0) {
          return '';
        }

        result.amount = 0;
        for (let shift = 0; ; shift += 7) {
          if (shift >= 64) {
            debugger;
            return 'ErrIntOverflowTransaction';
          }

          if (index >= length) {
            debugger;
            return 'Error Unexpected length';
          }

          let b = data[index];
          index++;
          result.amount |= (b & 0x7f) << shift;
          if (b < 0x80) {
            break;
          }
        }

        break;
      }

      default: {
        index = preIndex;

        break;
      }
    }
  }

  return result;
};
