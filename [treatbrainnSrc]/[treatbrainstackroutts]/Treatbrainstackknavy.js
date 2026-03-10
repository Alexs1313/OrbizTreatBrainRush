// stack nav

import SequenceLabScreen from '../[treatbrainscreenns]/SequenceLabScreen';
import LeaderboardScreen from '../[treatbrainscreenns]/LeaderboardScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrbizTreatGame from '../[treatbrainscreenns]/OrbizTreatGame';

import OrbizTreatAchievements from '../[treatbrainscreenns]/OrbizTreatAchievements';
import CustomLoader from '../[treatbraincmppnts]/CustomLoader';

import MainScreen from '../[treatbrainscreenns]/MainScreen';
import TreatOnboarding from '../[treatbrainscreenns]/TreatOnboarding';

const Stack = createNativeStackNavigator();

const Treatbrainstackknavy = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomLoader" component={CustomLoader} />
      <Stack.Screen name="TreatOnboarding" component={TreatOnboardin} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="OrbizTreatGame" component={OrbizTreatGame} />
      <Stack.Screen name="SequenceLabScreen" component={SequenceLabScreen} />
      <Stack.Screen name="LeaderboardScreen" component={LeaderboardScreen} />
      <Stack.Screen
        name="OrbizTreatAchievements"
        component={OrbizTreatAchievements}
      />
    </Stack.Navigator>
  );
};

export default Treatbrainstackknavy;
