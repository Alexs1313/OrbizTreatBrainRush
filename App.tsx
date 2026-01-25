import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { StoreProvider } from './[OrbizTreatBrainRush]/[storage]/orbizTreatContext';
import StackNavigator from './[OrbizTreatBrainRush]/[navigation]/StackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <StackNavigator />
        <Toast position="top" topOffset={45} />
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
