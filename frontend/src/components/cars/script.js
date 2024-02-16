
export function transformInteger(n) {
    let str = n.toString();
    let multiploTres = 3;
    while (multiploTres < str.length) {
        let lastDigits = str.slice(-multiploTres);
        str = str.replace(lastDigits, '') + ',' + lastDigits;
        multiploTres = multiploTres + 4;
    }
    return str;
}

export function toTitle(str){
    str = str.toLowerCase();
    return str.replace(str[0], str[0].toUpperCase())
}

export default {transformInteger, toTitle}