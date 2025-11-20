import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Button, Dimensions, Easing, Image, StyleSheet, Text, View } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { RootStackParamList } from "../../constants/utils";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'qr-scanner/index'>;

const { width } = Dimensions.get('window');
const SCANNER_SIZE = Math.min(width * 0.9, 300);

const QRScanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation<NavigationProp>();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  useFocusEffect(
    React.useCallback(() => {
      if (permission?.granted) {
        console.log('Activating camera');
        setIsActive(true);
        startScanAnimation();
      }
      return () => {
        console.log('Deactivating camera');
        setIsActive(false);
        scanAnim.stopAnimation();
      };
    }, [permission?.granted])
  );

  const startScanAnimation = () => {
    scanAnim.setValue(0);
    Animated.loop(
      Animated.timing(scanAnim, {
        toValue: SCANNER_SIZE,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (data && !scannedData) {
      console.log('Scanned QR code:', data);
      setScannedData(data);
      setIsActive(false);
      navigation.navigate('qr-result/index', { qrData: data });
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permission}>
        <Text style={styles.message}>Camera permission is required.</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.profileTitle}> Medi QR Scanner </Text>
      </View>
      
      <View style={styles.cameraContainer}>
        {isActive && (
          <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            onBarcodeScanned={scannedData ? undefined : handleBarcodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
          />
        )}
        <View style={styles.scanFrame} />
        <Animated.View
          style={[styles.scanLine, { transform: [{ translateY: scanAnim }] }]}
        />
      </View>
      {scannedData && (
        <View style={styles.buttonContainer}>
          <Button
            title="Scan Again"
            onPress={() => {
              setScannedData(null);
              setIsActive(true);
              startScanAnimation();
            }}
            color="#35dfef"
          />
        </View>
      )}
    </View>
  );
};

// Keep your existing styles the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e727a',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  permission: {
    flex: 1,
    backgroundColor: '#1e727a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0,
    paddingBottom: 30,
  },
  logo: {
    width: 160,
    marginBottom: -30
  },
  profileTitle: {
    fontSize: RFValue(32, 812),
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'RobotoSlab-Bold',
  },
  cameraContainer: {
    width: SCANNER_SIZE,
    height: SCANNER_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  scanFrame: {
    position: 'absolute',
    width: SCANNER_SIZE,
    height: SCANNER_SIZE,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 4,
  },
  scanLine: {
    position: 'absolute',
    width: SCANNER_SIZE,
    height: 2,
    backgroundColor: '#35dfef',
    opacity: 0.8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    padding: 10,
  },
  message: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default QRScanner;