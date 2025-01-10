/* eslint-disable react/react-in-jsx-scope */
import { Dimensions, StyleSheet, Text, View, ImageBackground } from "react-native";
import { Image } from "react-native";
import { Chip } from 'react-native-paper';

const user = {
   name: 'Salma Ahmed',
   role: 'Front end developer at noon',
   about: 'I am a fresh graduate from faculty of engineering , Cairo university. I graduated with an excellent grade. I have a strong passion for web development and I am always eager to learn new technologies.',
};

const Profile = () => {
   return (
      <ImageBackground
      blurRadius={2}
         style={styles.container}
         source={require('../../assets/images/watermark.jpg')}
         resizeMode="cover"
      >
         <View style={styles.view}>
            <Image
               style={styles.backgroundImage}
               source={require('../../assets/images/background2.jpg')}
               resizeMode="cover"
            />
         </View>
         <View style={styles.secondView}>
            <Image
               style={styles.avatar}
               source={require('../../assets/images/avatar.jpg')}
               resizeMode="contain"
            />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.about}>{user.role}</Text>
            <View style={styles.chipView}>
               <Chip style={styles.chip}>React</Chip>
               <Chip style={styles.chip}>NextJs</Chip>
               <Chip style={styles.chip}>Flutter</Chip>
            </View>
            <View style={styles.cardView}>
               <View style={styles.card}>
                  <Text style={styles.cardTitle}>ABOUT ME</Text>
                  <View>
                     <Text style={styles.cardContent}>{user.about}</Text>
                  </View>
               </View>
            </View>
         </View>
      </ImageBackground>
   );
};

const { width: screenWidth } = Dimensions.get('window');
const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   view: {
      width: '100%',
   },
   backgroundImage: {
      width: screenWidth,
      height: screenWidth * 0.75,
      borderBottomRightRadius: 100,
      borderBottomLeftRadius: 100,
   },
   secondView: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
   },
   avatar: {
      height: 155,
      width: 155,
      borderWidth: 6,
      alignItems: 'center',
      marginTop: -100,
      borderRadius: 100,
      borderColor: '#fff',
   },
   name: {
      paddingTop: 10,
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
   },
   cardTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
      paddingBottom: 10,
   },
   cardContent: {
      fontSize: 17,
      fontWeight:'400',
      color: '#000',
      padding:3,
      paddingBottom: 10,
   },
   about: {
      fontSize: 17,
      textAlign: 'center',
      padding: 4,
      color: '#666',
   },
   chipView: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
   },
   chip: {
      margin: 10,
   },
   cardView: {
      flex: 1,
      justifyContent: 'flex-start',
      width: '100%',
   },
   card: {
      margin: 20,
      marginBottom: 0,
      padding: 10,
      width: '94%',
   },
});

export default Profile;
