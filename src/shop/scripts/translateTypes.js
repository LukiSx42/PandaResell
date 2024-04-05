function transalateTypes(type) {
    type = type.toLowerCase();
    if (type === 'shoes') {
        return 'topánky';
    } else if (type === 't-shirt') {
        return 'tričká';
    } else if (type === 'polo-shirt') {
        return 'košele';
    } else if (type === 'long-shirt') {
        return 'dlhé tričká';
    } else if (type === 'sweater') {
        return 'svetre';
    } else if (type === 'hoodie') {
        return 'mikiny';
    } else if (type === 'vest') {
        return 'vesty';
    } else if (type === 'thin-jacket') {
        return 'tenké bundy';
    } else if (type === 'jacket') {
        return 'bundy';
    } else if (type === 'shorts') {
        return 'krátke nohavice';
    } else if (type === 'pants') {
        return 'nohavice';
    } else if (type === 'underwear') {
        return 'spodné prádlo';
    } else if (type === 'socks') {
        return 'ponožky';
    } else if (type === 'bag') {
        return 'tašky';
    } else if (type === 'hat') {
        return 'čiapky';
    } else if (type === 'other') {
        return 'ostatné';
    } else { // if not in db then return the original
        return type;
    }
}

export default transalateTypes;