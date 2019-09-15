import shasum from 'shasum';
// import { i18n, runtime, browserAction, notifications } from 'webextension-polyfill';
import isNumber from 'is-number';
// import protocol from 'nkn-wallet/lib/crypto/protocol';
const protocol = require('nkn-wallet/lib/crypto/protocol');
import configs from './configs';

function unleadingHashIt(str: string){
	return str.replace(/^#*/, '');
}

function leadingHashIt(str: string){
	return '#' + unleadingHashIt(str);
}

export function genChatID(topic: string) {
	if (!topic){
		return null;
	}
	topic = unleadingHashIt(String(topic));
	// Api/code somewhere does not like strings that start with numbers.
	return 'dchat' + shasum(topic);
}

export function getChatDisplayName(topic: string) {
	if (!topic){
		return '';
	}
	if (topic.startsWith('/whisper/')) {
		return topic.slice('/whisper/'.length);
	}
	return leadingHashIt(String(topic));
}

export function getChatURL(topic: string) {
	if (!topic) {
		return '';
	}
	if (topic.startsWith('/whisper/')) {
		return topic;
	}

	topic = getChatDisplayName(topic);
	if (!topic) {
		return '';
	}
	// Usually shoved to <Link to={} /> so remember to prepend '#' on form actions etc.
	return '/chat/' + topic.slice(1);
}

export function getChatName(topic: string) {
	if (!topic) {
		return null;
	}
	topic = unleadingHashIt(String(topic));
	if (!topic) {
		return null;
	}
	return topic;
}

export function __(str: string, ...placeholders: []) {
    return str;
	// The i18n generator has a bug with empty prefix, so trim.
	// Chrome doesn't want things in the keys.
	// return i18n.getMessage(str.replace(/[^a-zA-Z_]/g, ''), placeholders).trim();
}

export const formatAddr = (addr: string) => {
	const lastDotPosition = addr.lastIndexOf('.');
	let formattedAddr = '';
	if (lastDotPosition !== -1) {
		formattedAddr =  addr.substring(0, lastDotPosition + 7);
	} else {
		formattedAddr = addr.substring(0,6);
	}
	return formattedAddr;
};

export const parseAddr = (addr: string) => {
	if (!addr) {
		return ['', ''];
	}
	const lastDotPosition = addr.lastIndexOf('.');
	let pubKey = addr;
	let formattedAddr = '';
	if (lastDotPosition !== -1) {
		formattedAddr =  addr.substring(0, lastDotPosition);
		pubKey = addr.slice(lastDotPosition + 1);
	}
	return [ formattedAddr, pubKey ];
};

export const getAddressFromPubKey = (pubKey: string) => {
	const nknAddress = protocol.programHashStringToAddress(
		protocol.hexStringToProgramHash(
			protocol.publicKeyToSignatureRedeem(pubKey)
		)
	);
	
	return nknAddress;
};

export const setBadgeText = (txt: string) => {
	if (isNumber(txt)) {
		if (+txt < 0) {
			console.warn('Badge text was negative:', txt);
		}
		txt = (+txt <= 0) ? '' : txt;
    }
    
	// browserAction.setBadgeText({
	// 	text: String(txt)
	// });
};

export const IS_FIREFOX = true;

export const createNotification = async (options: any) => {
	// if (configs.showNotifications) {
	// 	return notifications.create( 'd-chat', {
	// 		type: 'basic',
	// 		title: options.title || '',
	// 		message: options.message || '',
	// 		iconUrl: runtime.getURL('/img/NKN_D-chat_blue-64cropped.png'),
	// 	});
	// }
};

export const genPrivateChatName = (recipient: string) => `/whisper/${recipient}`;
export const getWhisperURL = (recipient: string) => `/whisper/${recipient}`;
