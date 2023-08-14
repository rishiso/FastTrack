import {Image, View} from 'react-native';
import {LogoutButton} from './LogoutButton';

const PageHeader = () => {
  return (
    <View style={{height: 120}}>
      <View style={{position: 'absolute', right: 5, top: 60}}>
        <LogoutButton />
      </View>
      <Image
        style={{width: 42, height: 42, marginTop: 55, alignSelf: 'center'}}
        source={require('../assets/Logo.png')}
      />
    </View>
  );
};

export default PageHeader;
