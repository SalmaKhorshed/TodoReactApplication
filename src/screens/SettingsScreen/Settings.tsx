/* eslint-disable react/react-in-jsx-scope */
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { SettingsIcon } from 'lucide-react-native';


const Settings = () => {
   return (
     
      <View style={styles.content}>
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
            <SettingsIcon size={20} color="#000" style={styles.icon} />
            <Text style={styles.account}>System Settings</Text>
         </View>
         <View/>
         <Card style={styles.card}>
            <Card.Content>
               <Text>Card title</Text>
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
   icon:{
     marginTop: 2,

   },
   account:{
      paddingLeft: 5,
      fontSize: 18,
      fontWeight: '500',
      color: '#333',
   },
   card:{
      margin: 10,
      width : '95%',
      height: 60,
      backgroundColor: '#fff',
   },
   
});
export default Settings;
