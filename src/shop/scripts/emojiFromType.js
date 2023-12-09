function emojiFromType(type) {
    let emoji = "";
    if (type.includes("T-Shirt")) {
        emoji += "👕";
    }
    if (type.includes("Shorts")) {
        emoji += "🩳";
    } 
    if (type.includes("Hoodie")) {
        emoji += "👘";
    }
    if (type.includes("Hat")) {
        emoji += "🎩";
    }
    if (type.includes("Jacket")) {
        emoji += "🧥";
    }
    if (type.includes("Thin-Jacket")) {
        emoji += "🥼";
    }
    if (type.includes("Long-Shirt")) {
        emoji += "👕";
    }
    if (type.includes("Polo-Shirt")) {
        emoji += "👔";
    }
    if (type.includes("Underwear")) {
        emoji += "🩲";
    }
    if (type.includes("Shoes")) {
        emoji += "👟";
    }
    if (type.includes("Sweater")) {
        emoji += "👘";
    }
    if (type.includes("Socks")) {
        emoji += "🧦";
    }
    if (type.includes("Other")) {
        emoji += "💎";
    }
    if (type.includes("Pants")) {
        emoji += "👖";
    }
    if (type.includes("Vest")) {
        emoji += "🦺";
    }
    if (type.includes("Bag")) {
        emoji += "🎒";
    }
    return emoji;
}

export default emojiFromType;