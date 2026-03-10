import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';

import { StoreProvider } from './[treatbrainnSrc]/[treatbrainstoragge]/orbizTreatContext';

import Treatbrainstackknavy from './[treatbrainnSrc]/[treatbrainstackroutts]/Treatbrainstackknavy';

const App = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <Treatbrainstackknavy />
        <Toast position="top" topOffset={45} />
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
