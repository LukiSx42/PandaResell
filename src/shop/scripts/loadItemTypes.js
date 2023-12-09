import TypeDB from "../../config/type_db.json";

const loadItemTypes = () => {
    let itemTypes = [];

    Object.values(TypeDB).forEach(type => {
        if (itemTypes.indexOf(type) === -1) {
            itemTypes.push(type);
        }
    });

    return itemTypes;
};

export default loadItemTypes;