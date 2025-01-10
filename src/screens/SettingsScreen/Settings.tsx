/* eslint-disable react/react-in-jsx-scope */
import { Image, ImageBackground, StyleSheet, Switch, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { SettingsIcon , MoonStar} from 'lucide-react-native';
import { useThemeStore } from '../../stores/themeStore';


const Settings = () => {
   const { isDarkMode, toggleDarkMode} = useThemeStore();
   return (
     
      <View style={[styles.container, isDarkMode ? styles.dark : styles.light]}>
         <View style={styles.imageBackgroundWrapper}>
         <ImageBackground
         style={styles.back}
         source={require('../../assets/images/background2.jpg')}
         resizeMode="cover"
      >
        <Image
                  style={styles.avatar}
                  source={require('../../assets/images/avatar.jpg')}
                  resizeMode="contain"
               />
               <Text style={styles.name}>Salma Ahmed</Text>

      </ImageBackground>
         </View>
         <View style={styles.secondSection}>
            <SettingsIcon size={20} color={isDarkMode? "#fff":"#000"} style={styles.icon} />
            <Text style={isDarkMode ? styles.accountDark : styles.account}>System Settings</Text>
         </View>
         <View/>
         <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
            <View style={styles.labelContainer}>
               <View style={styles.themeIconContainer}>
               <MoonStar size={20} color="#fff" style={styles.themeIcon} />
               </View>
              <Text style={styles.label}>Dark mode</Text>
            </View>
            <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            thumbColor={isDarkMode ? '#fff' : '#000'}
            />
            </Card.Content>
        </Card>

      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   content:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      backgroundColor: '#fff',
   },
   back:{
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 40,
    
   },
   imageBackgroundWrapper: {
      margin: 10,
      borderRadius: 100,
      
   },
   labelContainer:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
   },
   secondSection:{
      flexDirection: 'row',
      padding: 10,
   },
  
   avatar: {
      height: 70,
      width: 70,
      borderWidth:3,
      borderRadius: 100,
      borderColor: '#fff',
   },
   name: {
      padding: 10,
      paddingTop: 20,
      fontSize: 18,
      fontWeight: '500',
      color: '#333',
   },
   cardContent:{
      flexDirection: 'row',
      justifyContent: 'space-between',

   },
   label:{
      padding: 3,
      paddingLeft: 10,
      fontSize: 16,
      fontWeight: '400',
      color: '#333',
   },
   icon:{
     marginTop: 3,

   },
   themeIconContainer:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: 'blue',
      padding: 5,
      borderRadius: 10,
   },
   themeIcon:{
      
     
   },
   account:{
      paddingLeft: 5,
      fontSize: 18,
      fontWeight: '500',
      color: '#333',
   },
   accountDark:{
      paddingLeft: 5,
      fontSize: 18,
      fontWeight: '500',
      color: '#fff',
   },
   card:{
      margin: 10,
      width : '95%',
      height: 60,
      backgroundColor: '#fff',
   },
   dark: {
      backgroundColor: '#000',
      color: '#fff',
    },
    light: {
      backgroundColor: '#fff',
      color: '#000',
    },
   
});
export default Settings;
