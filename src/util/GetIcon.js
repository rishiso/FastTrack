export class GetIcon {
    static images = [
        {
        name: 'PandaExpress.png',
        image: require('../assets/Businesses/PandaExpress.png'),
        },
        {
        name: 'NorthAvenue.png',
        image: require('../assets/Businesses/NorthAvenue.png'),
        },
        {
        name: 'ChickFilA.png',
        image: require('../assets/Businesses/ChickFilA.png'),
        },
        {
        name: 'Brittain.png',
        image: require('../assets/Businesses/Brittain.png'),
        },
        {
        name: 'WestVillage.png',
        image: require('../assets/Businesses/WestVillage.png'),
        },
        {
        name: 'BlueDonkey.png',
        image: require('../assets/Businesses/BlueDonkey.png'),
        },

    ];
    static retrieve = (name) => {
        const found = GetIcon.images.find(e => e.name === name);
        return found ? found.image : null;
    };
}