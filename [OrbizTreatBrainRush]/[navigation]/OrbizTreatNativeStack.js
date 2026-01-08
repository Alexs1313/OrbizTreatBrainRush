import { createNativeStackNavigator } from '@react-navigation/native-stack';

// stack screens import
import OrbizTreatHome from '../[screens]/OrbizTreatHome';
import OrbizTreatOnboard from '../[screens]/OrbizTreatOnboard';
import OrbizTreatGame from '../[screens]/OrbizTreatGame';
import OrbizTreatAchievements from '../[screens]/OrbizTreatAchievements';
import CustomLoader from '../[components]/CustomLoader';

const Stack = createNativeStackNavigator();

const OrbizTreatNativeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomLoader" component={CustomLoader} />
      <Stack.Screen name="OrbizTreatOnboard" component={OrbizTreatOnboard} />
      <Stack.Screen name="OrbizTreatHome" component={OrbizTreatHome} />
      <Stack.Screen name="OrbizTreatGame" component={OrbizTreatGame} />
      <Stack.Screen
        name="OrbizTreatAchievements"
        component={OrbizTreatAchievements}
      />
    </Stack.Navigator>
  );
};

export default OrbizTreatNativeStack;
