import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RootStackParamList } from "../../constants/utils";

interface UserData {
  name: string;
  email: string;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'user-form/index'>;

const UserForm = () => {
  const navigation = useNavigation<NavigationProp>();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userData');
        if (storedData) {
          const parsedData: UserData = JSON.parse(storedData);
          setUserData(parsedData);
        }
      } catch (err) {
        console.error('Error loading user data:', err);
      }
    };
    loadUserData();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      setError('Please enter both name and email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    const data: UserData = { name: name.trim(), email: email.trim() };
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
      setUserData(data);
      setError('');
      setName('');
      setEmail('');
    } catch (err) {
      console.error('Error saving user data:', err);
      setError('Failed to save data. Please try again.');
    }
  };

  const handleStartScan = () => {
    navigation.navigate('qr-scanner/index');
  };

  const handleViewBenefits = () => {
    navigation.navigate('benefits/index');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Medi QR</Text>
      </View>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        {userData ? (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome @{userData.name}</Text>
            <Pressable style={styles.nextBtn} onPress={handleStartScan}>
              <Text style={styles.nextText}>Start Scan QR</Text>
            </Pressable>
            <Pressable onPress={handleViewBenefits}>
              <Text style={styles.linkText}>View Medi QR Benefits</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.profileTitle}>Enter Your Details</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Icon name="person" size={20} color="#1e727a" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor="#9d9d9d"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  accessibilityLabel="Name input"
                />
              </View>
              <View style={styles.inputWrapper}>
                <Icon name="mail" size={20} color="#1e727a" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#9d9d9d"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  accessibilityLabel="Email input"
                />
              </View>
            </View>
            <Pressable style={styles.nextBtn} onPress={handleSubmit}>
              <Text style={styles.nextText}>Submit</Text>
            </Pressable>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    width: '100%',
    borderColor: '#d1d1d1ff',
    borderWidth: 1,
    alignItems: 'center',
    gap: 20,
  },
  welcomeText: {
    fontSize: RFValue(24, 812),
    fontWeight: 'bold',
    color: '#272727ff',
    fontFamily: 'RobotoSlab-Bold',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    width: '100%',
    borderColor: '#d1d1d1ff',
    borderWidth: 1,
    alignItems: 'center',
    gap: 20,
  },
  profileTitle: {
    fontSize: RFValue(32, 812),
    fontWeight: 'bold',
    color: '#272727ff',
    fontFamily: 'RobotoSlab-Bold',
  },
  inputContainer: {
    width: '100%',
    gap: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#9d9d9dff',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: RFValue(17, 812),
    color: '#333333',
    fontFamily: 'Montserrat-SemiBold',
  },
  errorText: {
    fontSize: RFValue(14, 812),
    color: '#ff4d4d',
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
  },
  nextBtn: {
    backgroundColor: '#1e727a',
    paddingVertical: RFValue(12, 812),
    paddingHorizontal: RFValue(28, 812),
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
  },
  nextText: {
    fontSize: RFValue(16, 812),
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
  linkText: {
    fontSize: RFValue(16, 812),
    color: '#35dfef',
    fontFamily: 'Montserrat-SemiBold',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default UserForm;