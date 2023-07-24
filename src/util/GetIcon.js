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
    {
      name: 'Library.png',
      image: require('../assets/Businesses/Library.png'),
    },
    {
      name: 'TwistedTaco.jpg',
      image: require('../assets/Businesses/TwistedTaco.jpg'),
    },
    {
      name: 'CRC.png',
      image: require('../assets/Businesses/CRC.png'),
    },
    {
      name: 'PostOffice.png',
      image: require('../assets/Businesses/PostOffice.png'),
    },
  ];
  static retrieve = name => {
    const found = GetIcon.images.find(e => e.name === name);
    return found ? found.image : null;
  };
}
