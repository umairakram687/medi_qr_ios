import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from "../../constants/utils";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'benefits/index'>;

interface Benefit {
  title: string;
  description: string;
  image: any; 
}

const Benefits = () => {
  const navigation = useNavigation<NavigationProp>();

  const benefits: Benefit[] = [
    {
      title: 'Works Without a Signal',
      description:
        'Medi‑QR doesn’t rely on databases or online platforms. Whether you’re in a remote area or during a network outage, your data is always available.',
      image: require('../../assets/loved-responder.png'),
    },
    {
      title: 'Private & Secure',
      description:
        'Unlike most digital health tools, we don’t store your data online. There’s nothing to hack, no logins to steal. Your QR code lives with you — and only you.',
      image: require('../../assets/private-secure.png'),
    },
    {
      title: 'Cost-Effective Peace of Mind',
      description:
        'From a free basic option to premium and institutional tiers, Medi‑QR fits your needs and your budget. One small investment can make a life-saving difference.',
      image: require('../../assets/cost-effective.png'),
    },
    {
      title: 'Loved by Responders & Care Teams',
      description:
        'EMTs, caregivers, teachers, and school nurses can act faster with access to allergies, medications, and emergency contacts — saving lives and avoiding disaster.',
      image: require('../../assets/loved-responder.png'),
    },
    {
      title: 'Protects Anyone, Anywhere',
      description:
        'Ideal for seniors, children, allergy sufferers, and travelers — anyone who may need quick access to medical information in daily life or emergencies.',
      image: require('../../assets/protect-anywhere.png'),
    },
    {
      title: 'Real-Life Emergency Scenarios',
      description:
        'From injured hikers and school accidents to elder care and caregiver checks — Medi‑QR ensures responders have life-saving details on hand instantly.',
      image: require('../../assets/real-life.png'),
    },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleStartScan = () => {
    navigation.navigate('qr-scanner/index');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Benefits of Medi QR</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.cardsContainer}>
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.card}>
              <Image
                source={benefit.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <Text style={styles.cardTitle}>{benefit.title}</Text>
              <Text style={styles.cardDescription}>{benefit.description}</Text>
            </View>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.backBtn]} onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.nextBtn]} onPress={handleStartScan}>
            <Text style={styles.buttonText}>Start QR Scan</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Your styles remain unchanged
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: 80,
    width: '100%',
    backgroundColor: '#1e727a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(32, 812),
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'RobotoSlab-Bold',
  },
  content: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  profileTitle: {
    fontSize: RFValue(32, 812),
    fontWeight: 'bold',
    color: '#272727ff',
    fontFamily: 'RobotoSlab-Bold',
    marginBottom: 20,
  },
  cardsContainer: {
    width: '100%',
    gap: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    borderColor: '#d1d1d1ff',
    borderWidth: 1,
    alignItems: 'center',
    gap: 10,
  },
  cardImage: {
    width: '100%',
    height: RFValue(180, 812),
  },
  cardTitle: {
    fontSize: RFValue(18, 812),
    fontWeight: '600',
    color: '#333333',
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: RFValue(14, 812),
    color: '#333333',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: RFValue(12, 812),
    paddingHorizontal: RFValue(20, 812),
    borderRadius: 12,
    alignItems: 'center',
  },
  backBtn: {
    backgroundColor: '#35dfef',
  },
  nextBtn: {
    backgroundColor: '#1e727a',
  },
  buttonText: {
    fontSize: RFValue(16, 812),
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
  },
});

export default Benefits;