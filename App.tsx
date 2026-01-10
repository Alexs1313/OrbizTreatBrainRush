import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import OrbizTreatNativeStack from './OrbizTreatBrainRush/navigation/OrbizTreatNativeStack';
import { StoreProvider } from './OrbizTreatBrainRush/storage/orbizTreatContext';

const App = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <OrbizTreatNativeStack />
        <Toast position="top" topOffset={45} />
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
