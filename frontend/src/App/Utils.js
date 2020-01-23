import axios from "axios";

import { apiUrl, defaultAxiosOptions, coinbaseDefaultLength } from "./Constants";

// RPC

export const getBlockchainInfo = () => {
    return axios.post(`${apiUrl}/rpc/getblockchaininfo`, defaultAxiosOptions).then(res => {
        const data = res.data;
        const result = data.result;
        if (result) {
            return result;
        } else {
            throw new Error("No data found");
        }
    });
};

// CUSTOM

export const getTest = () => {
    return axios.post(`${apiUrl}/custom/test`, defaultAxiosOptions).then(res => {
        const data = res.data;
        const result = data.msg;
        if (result) {
            return result;
        } else {
            throw new Error("No data found");
        }
    });
};

export const getBlockCoinbase = height => {
    return axios
        .post(`${apiUrl}/custom/getblockcoinbase`, { ...defaultAxiosOptions, height })
        .then(res => {
            const data = res.data;
            const hex = data.result;
            if (hex) {
                return {
                    ascii: hex.length > coinbaseDefaultLength ? toAscii(hex) : "",
                    hex
                };
            } else {
                throw new Error("No data found");
            }
        });
};

// other

/**
 * Code shamelessly stolen from: http://dolcevie.com/js/converter.html
 *
 */
var symbols = " !\"#$%&'()*+,-./0123456789:;<=>?@";
var loAZ = "abcdefghijklmnopqrstuvwxyz";
symbols += loAZ.toUpperCase();
symbols += "[\\]^_`";
symbols += loAZ;
symbols += "{|}~";

export function toAscii(initialHex) {
    const valueStr = initialHex.toLowerCase();
    var hex = "0123456789abcdef";
    var text = "";
    var i = 0;

    for (i = 0; i < valueStr.length; i = i + 2) {
        var char1 = valueStr.charAt(i);
        if (char1 == ":") {
            i++;
            char1 = valueStr.charAt(i);
        }
        var char2 = valueStr.charAt(i + 1);
        var num1 = hex.indexOf(char1);
        var num2 = hex.indexOf(char2);
        var value = num1 << 4; // eslint-disable-line no-bitwise
        value = value | num2; // eslint-disable-line no-bitwise

        var valueInt = parseInt(value);
        var symbolIndex = valueInt - 32;
        var ch = "?";
        if (symbolIndex >= 0 && value <= 126) {
            ch = symbols.charAt(symbolIndex);
        }
        text += ch;
    }

    return text;
}

export function toHex() {
    var valueStr = document.form1.ascii.value;
    var hexChars = "0123456789abcdef";
    var text = "";
    for (i = 0; i < valueStr.length; i++) {
        var oneChar = valueStr.charAt(i);
        var asciiValue = symbols.indexOf(oneChar) + 32;
        var index1 = asciiValue % 16;
        var index2 = (asciiValue - index1) / 16;
        if (text != "") text += ":";
        text += hexChars.charAt(index2);
        text += hexChars.charAt(index1);
    }
    return text;
}
