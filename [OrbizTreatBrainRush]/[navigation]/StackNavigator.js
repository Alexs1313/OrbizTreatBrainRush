import { createNativeStackNavigator } from '@react-navigation/native-stack';

// stack screens import

import OrbizTreatGame from '../[screens]/OrbizTreatGame';
import OrbizTreatAchievements from '../[screens]/OrbizTreatAchievements';
import CustomLoader from '../[components]/CustomLoader';
import MainScreen from '../[screens]/MainScreen';
import TreatOnboarding from '../[screens]/TreatOnboarding';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomLoader" component={CustomLoader} />
      <Stack.Screen name="TreatOnboarding" component={TreatOnboarding} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="OrbizTreatGame" component={OrbizTreatGame} />
      <Stack.Screen
        name="OrbizTreatAchievements"
        component={OrbizTreatAchievements}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
