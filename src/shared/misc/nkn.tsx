import configs from './configs';
const rpcCall = require('nkn-client/lib/rpc');
import {
  setBalance,
  confirmTransaction,
  addTransaction,
} from '../redux/actions/walletActionCreators';
import {
  receiveMessage,
  markReceived,
} from '../redux/actions/chatActionCreators';
import {
  addContactSuccess,
  updateContactImage,
  addContactInvitationReceived as invitationReceived,
} from '../redux/actions/contactsActionCreators';
import {Decimal} from 'decimal.js';
import MESSAGE_TYPES from '../redux/constants/messageTypes';
import {AppState} from '../redux/reducers';
import store from '../redux/store';
import {unmarshalCoinbase} from './util';
import * as RNFS from 'react-native-fs';
import {bytesToHex} from 'nkn-client/lib/crypto/tools';
import {programHashStringToAddress} from 'nkn-wallet/lib/crypto/protocol';
import {UserPayload} from '../models/payloads';

const nknClient = require('nkn-client');
const msgpack = require('msgpack-lite');

const BUCKET = 0;
const FEE = 0.00000001;
const FORBLOCKS = 50000;
const SEED_ADDRESSES = [
  'http://mainnet-seed-0001.nkn.org:30003',
  'http://mainnet-seed-0002.nkn.org:30003',
  'http://mainnet-seed-0003.nkn.org:30003',
  'http://mainnet-seed-0004.nkn.org:30003',
  'http://mainnet-seed-0005.nkn.org:30003',
  'http://mainnet-seed-0006.nkn.org:30003',
  'http://mainnet-seed-0007.nkn.org:30003',
  'http://mainnet-seed-0008.nkn.org:30003',
  'http://mainnet-seed-0009.nkn.org:30003',
  'http://mainnet-seed-0010.nkn.org:30003',
  'http://mainnet-seed-0011.nkn.org:30003',
  'http://mainnet-seed-0012.nkn.org:30003',
  'http://mainnet-seed-0013.nkn.org:30003',
  'http://mainnet-seed-0014.nkn.org:30003',
  'http://mainnet-seed-0015.nkn.org:30003',
  'http://mainnet-seed-0016.nkn.org:30003',
  'http://mainnet-seed-0017.nkn.org:30003',
  'http://mainnet-seed-0018.nkn.org:30003',
  'http://mainnet-seed-0019.nkn.org:30003',
  'http://mainnet-seed-0020.nkn.org:30003',
  'http://mainnet-seed-0021.nkn.org:30003',
  'http://mainnet-seed-0022.nkn.org:30003',
  'http://mainnet-seed-0023.nkn.org:30003',
  'http://mainnet-seed-0024.nkn.org:30003',
  'http://mainnet-seed-0025.nkn.org:30003',
  'http://mainnet-seed-0026.nkn.org:30003',
  'http://mainnet-seed-0027.nkn.org:30003',
  'http://mainnet-seed-0028.nkn.org:30003',
  'http://mainnet-seed-0029.nkn.org:30003',
  'http://mainnet-seed-0030.nkn.org:30003',
  'http://mainnet-seed-0031.nkn.org:30003',
  'http://mainnet-seed-0032.nkn.org:30003',
  'http://mainnet-seed-0033.nkn.org:30003',
  'http://mainnet-seed-0034.nkn.org:30003',
  'http://mainnet-seed-0035.nkn.org:30003',
  'http://mainnet-seed-0036.nkn.org:30003',
  'http://mainnet-seed-0037.nkn.org:30003',
  'http://mainnet-seed-0038.nkn.org:30003',
  'http://mainnet-seed-0039.nkn.org:30003',
  'http://mainnet-seed-0040.nkn.org:30003',
  'http://mainnet-seed-0041.nkn.org:30003',
  'http://mainnet-seed-0042.nkn.org:30003',
  'http://mainnet-seed-0043.nkn.org:30003',
  'http://mainnet-seed-0044.nkn.org:30003',
];

const TRANSACTION_TYPES = {
  COINBASE: 'COINBASE_TYPE',
  TRANSFER_ASSET: 'TRANSFER_ASSET_TYPE',
};

const publicKeyLength = 64;

export default class NknService {
  static client: any;
  static wallet: any;
  static seedNode: string;

  static getTxDetailsFromPayload = (payload: any) => {
    const result = unmarshalCoinbase(payload);

    const senderBytes = result.sender[0];
    const senderHex = bytesToHex(senderBytes);
    const senderAddress = programHashStringToAddress(senderHex);

    const recipientBytes = result.recipient[0];
    const recipientHex = bytesToHex(recipientBytes);
    const recipientAddress = programHashStringToAddress(recipientHex);

    const amount = result['amount'] / 100000000;

    return {from: senderAddress, to: recipientAddress, amount};
  };

  static auditTransaction = async (hash: string) => {
    const tx = await rpcCall(NknService.seedNode, 'gettransaction', {hash});
    const type = tx.txType;
    if (
      type == TRANSACTION_TYPES.TRANSFER_ASSET ||
      type == TRANSACTION_TYPES.COINBASE
    ) {
      return NknService.getTxDetailsFromPayload(tx.payloadData);
    }
  };

  static initializeClient = (
    wallet: any,
    dispatch: Function,
    getState: () => AppState,
  ) => {
    if (NknService.client) {
      return;
    }

    const seedNodeIndex = Math.floor(
      Math.random() * configs.seedAddresses.length,
    );

    const seedNode = configs.seedAddresses[seedNodeIndex];
    // const seedNode = 'http://64.190.202.140:30003';
    NknService.seedNode = seedNode;
    const seed = wallet.getSeed();
    const client = nknClient({
      seed: seed,
      seedRpcServerAddr: seedNode,
      responseTimeout: 5,
      numSubClients: 5,
      originalClient: false,
    });

    const publicKey = wallet.getPublicKey();

    client.on('error', () => {
      debugger;
    });

    client.on('connect', async () => {
      console.log('***CONNECTED!');

      // const latestBlock = await rpcCall(seedNode, 'getlatestblockheight');
      // debugger;
      // const lastAuditedBlock = store.getState().app.lastAudittedBlock;
      // if (latestBlock > lastAuditedBlock) {
      //   const height =
      //     lastAuditedBlock == 0 ? latestBlock - 1 : lastAuditedBlock + 1;

      //   debugger;
      //   const transactionHashes = (await rpcCall(
      //     seedNode,
      //     'getblocktxsbyheight',
      //     {height},
      //   )).Transactions;

      //   debugger;
      //   for (let i = 0; i < transactionHashes.length; i++) {
      //     const hash = transactionHashes[i];
      //     let details = await NknService.auditTransaction(hash);
      //     console.log(details);
      //     debugger;
      //   }
      // }
    });

    client.on(
      'message',
      (
        fromUserId: string,
        message: any,
        payloadType: number,
        isEncrypted: boolean,
      ) => {
        if (payloadType == nknClient.PayloadType.TEXT) {
        } else if (payloadType == nknClient.PayloadType.BINARY) {
          const decoded = msgpack.decode(message);
          switch (decoded.type) {
            case MESSAGE_TYPES.CHAT.MESSAGE: {
              const messageContents = decoded.text;
              const payload = {
                text: messageContents,
                createdAt: new Date(),
                user: {
                  _id: fromUserId,
                },
                _id: decoded._id,
              };

              dispatch(receiveMessage(payload));
              return 'well received';
            }

            case MESSAGE_TYPES.CHAT.MESSAGE_SEEN: {
              const messageId = decoded._id;
              const chatId = fromUserId;
              const payload = {chatId, messageId, userId: publicKey};
              dispatch(markReceived(payload));
              break;
            }

            case MESSAGE_TYPES.CONTACT.ADD: {
              const invitationReceivedPayload = {
                contactId: fromUserId,
                userId: publicKey,
                username: decoded.username,
                requestReceivedOn: new Date(),
              };

              dispatch(invitationReceived(invitationReceivedPayload));
              break;
            }

            case MESSAGE_TYPES.CONTACT.ACCEPT: {
              if (decoded.avatarData) {
                const avatarDataBase64 = decoded.avatarData;
                const dirPath = `${RNFS.DocumentDirectoryPath}/avatars/${publicKey}`;
                RNFS.mkdir(dirPath)
                  .then(x => {
                    const filePath = `${dirPath}/${fromUserId}`;
                    RNFS.writeFile(filePath, avatarDataBase64, 'base64')
                      .then(y => {
                        dispatch(
                          addContactSuccess({
                            userId: publicKey,
                            contactId: fromUserId,
                            acceptedOn: new Date(),
                            avatarDataBase64,
                            path: filePath,
                          }),
                        );
                      })
                      .catch(err => {});
                  })
                  .catch(e => {});
              } else {
                dispatch(
                  addContactSuccess({
                    userId: publicKey,
                    contactId: fromUserId,
                    acceptedOn: new Date(),
                  }),
                );
              }

              const avatarSource = getState().auth.currentUser.avatarSource;
              if (avatarSource) {
                const avatarUri = avatarSource.uri;
                RNFS.readFile(avatarUri, 'base64').then((data: string) => {
                  const encodedMessage = msgpack.encode({
                    type: MESSAGE_TYPES.CONTACT.UPDATE_IMAGE,
                    avatarData: data,
                  });

                  client
                    .send(fromUserId, encodedMessage)
                    .then(x => console.log(x))
                    .catch(e => console.log(e));
                });
              }

              break;
            }

            case MESSAGE_TYPES.CONTACT.UPDATE_IMAGE: {
              const avatarDataBase64 = decoded.avatarData;
              const dirPath = `${RNFS.DocumentDirectoryPath}/avatars/${publicKey}`;
              RNFS.mkdir(dirPath).then(x => {
                const filePath = `${dirPath}/${fromUserId}`;
                RNFS.writeFile(filePath, avatarDataBase64, 'base64').then(y => {
                  dispatch(
                    updateContactImage({
                      userId: publicKey,
                      contactId: fromUserId,
                      avatarDataBase64,
                      path: filePath,
                    }),
                  );
                });
              });

              break;
            }

            default:
              break;
          }
        }
      },
    );

    client.on('block', (block: any) => {
      console.log('***BLOCK received', block);
      alert('block');
      const {transactions} = block;
      const state = getState();
      const savedUsers = state.auth.savedUsers;

      let unconfirmed: any[] = [];
      savedUsers.forEach((user: UserPayload) => {
        let itemsToPush = state.wallet.txHistory[user.userId]
          .filter((x: any) => !x.confirmed)
          .map(x => ({...x, userId: user.userId, address: user.address}));

        if (itemsToPush && itemsToPush.length) {
          unconfirmed.push(...itemsToPush);
        }
      });

      for (let i = 0; i < transactions.length; i++) {
        const tx = transactions[i];
        const foundTx = unconfirmed.find(x => x.txId == tx.hash);
        if (foundTx) {
          const confirmTxPayload = {
            txId: foundTx.txId,
            userId: foundTx.userId,
            address: foundTx.address,
          };

          dispatch(confirmTransaction(confirmTxPayload));
          continue;
        }

        const type = tx.txType;
        if (
          type == TRANSACTION_TYPES.COINBASE ||
          type == TRANSACTION_TYPES.TRANSFER_ASSET
        ) {
          const payload = tx.payloadData;
          const details = NknService.getTxDetailsFromPayload(payload);
          if (details.amount > 1) {
            continue;
          }

          debugger;
          const toLocalUser = savedUsers.find(x => x.address == details.to);
          if (toLocalUser) {
            const addTxPayload = NknService.getAddTxPayload(
              toLocalUser,
              details,
              tx.hash,
            );
            dispatch(addTransaction(addTxPayload));
          }

          const fromLocalUser = savedUsers.find(x => x.address == details.from);
          if (fromLocalUser) {
            const addTxPayload = NknService.getAddTxPayload(
              fromLocalUser,
              details,
              tx.hash,
            );
            dispatch(addTransaction(addTxPayload));
          }
        }
      }
    });

    NknService.client = client;
    NknService.wallet = wallet;
    NknService.wallet.getBalance().then((x: Decimal) => {
      const payload = {balance: x.toNumber(), address: wallet.address};
      dispatch(setBalance(payload));
    });
  };

  static getAddTxPayload(user: UserPayload, details: any, txId: string) {
    const addTxPayload = {
      userId: user.userId,
      change: user.address == details.to ? details.amount : details.amount * -1,
      tx: {
        from: details.from,
        to: details.to,
        amount: details.amount,
        success: true,
        confirmed: true,
        txId,
      },
    };

    return addTxPayload;
  }
}
