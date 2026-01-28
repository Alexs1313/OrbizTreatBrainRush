import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { StoreProvider } from './_0xTrtSrc/_0xTrtstrG/orbizTreatContext';
import StackNavigator from './_0xTrtSrc/_0xTrtRtS/StackNavigator';

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
