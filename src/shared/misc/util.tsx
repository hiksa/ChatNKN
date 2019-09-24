const protocol = require('nkn-wallet/lib/crypto/protocol');

export const getAddressFromPubKey = (pubKey: string) => {
  const signatureRedeem = protocol.publicKeyToSignatureRedeem(pubKey);
  const programHashString = protocol.hexStringToProgramHash(signatureRedeem);
  const nknAddress = protocol.programHashStringToAddress(programHashString);
  return nknAddress;
};
