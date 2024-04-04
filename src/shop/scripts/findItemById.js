import ItemDB from '../../config/db.json';

function findItemById(id) {
    let i = null;
    let found = false;
    ItemDB.shops.every(shop => {
        ItemDB[shop].forEach(item => {
            if (item.id === id) {
                found = true;
                i = item;
                return false;
            }
            return true;
        });
        if (!found) {
            return true;
        }
    });

    return i;
}

export default findItemById;