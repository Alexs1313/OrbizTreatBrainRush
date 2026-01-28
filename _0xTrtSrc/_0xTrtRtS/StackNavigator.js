import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrbizTreatGame from '../_0xTrtScrnS/OrbizTreatGame';
import OrbizTreatAchievements from '../_0xTrtScrnS/OrbizTreatAchievements';
import CustomLoader from '../_0xTrtCmpN/CustomLoader';
import MainScreen from '../_0xTrtScrnS/MainScreen';
import TreatOnboarding from '../_0xTrtScrnS/TreatOnboarding';

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
