import {useState} from 'react';

import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';

const Welcome = () => {
  const [needsToRegister, toggleRegistration] = useState(true);

  return (
    <>
      {!needsToRegister ? (
        <LoginPage swap={toggleRegistration} />
      ) : (
        <RegistrationPage swap={toggleRegistration} />
      )}
    </>
  );
};

export default Welcome;
