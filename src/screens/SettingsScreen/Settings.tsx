/* eslint-disable react/react-in-jsx-scope */
import { ImageBackground, StyleSheet, Text, View } from "react-native";


const Settings = () => {
   return (
      <ImageBackground
      blurRadius={2}
         style={styles.container}
         source={require('../../assets/images/watermark.jpg')}
         resizeMode="cover"
      >
      <View>
         <Text>Home Screen</Text>
      </View>
      </ImageBackground>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});
export default Settings;
