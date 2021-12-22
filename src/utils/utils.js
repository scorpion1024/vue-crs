export function decode(token) {
    const key = 4;
    let decodeStr = token.slice(0, key + 1);
    const strLen = parseInt(new Date().getDate());
    const tokenArray = token.slice(key + 1);
    for (let index = strLen; index < tokenArray.length; index += (strLen + key)) {
        decodeStr += tokenArray.slice(index, index + key);
    }
    return decodeStr;
}
