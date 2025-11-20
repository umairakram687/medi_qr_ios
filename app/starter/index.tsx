import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import {
  Animated,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { RootStackParamList } from "../../constants/utils";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "lets-start/index">;

const Starter = () => {
  const navigation = useNavigation<NavigationProp>();

  const logoScale = useRef(new Animated.Value(1)).current;
  const stethoScale = useRef(new Animated.Value(1)).current;
  const scannerScale = useRef(new Animated.Value(1)).current;
  const injectionScale = useRef(new Animated.Value(1)).current;
  const handScale = useRef(new Animated.Value(1)).current;
  const qrScale = useRef(new Animated.Value(1)).current;
  const qrRotate = useRef(new Animated.Value(0)).current;

  const createScaleAnimation = (animatedValue: Animated.Value, delay: number) => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.2,
          duration: 800,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
  };

  const createQrAnimation = () => {
    return Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(qrScale, {
            toValue: 1.3,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(qrScale, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(qrRotate, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
  };

useEffect(() => {
  createScaleAnimation(logoScale, 0).start();
  createScaleAnimation(stethoScale, 300).start();
  createScaleAnimation(scannerScale, 600).start();
  createScaleAnimation(injectionScale, 900).start();
  createScaleAnimation(handScale, 1200).start();
  createQrAnimation().start();

  const checkFirstLaunch = async () => {
    try {
      console.log("Checking AsyncStorage...");
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");
      console.log("hasLaunched value:", hasLaunched);
      const targetScreen = hasLaunched ? "user-form/index" : "lets-star/indext";

      if (!hasLaunched) {
        console.log("Setting hasLaunched to true");
        await AsyncStorage.setItem("hasLaunched", "true");
      }

      const timer = setTimeout(() => {
        console.log("Navigating to:", targetScreen);
        navigation.replace(targetScreen as any);
      }, 3000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("AsyncStorage error:", error);
      const timer = setTimeout(() => {
        navigation.replace("lets-start/index");
      }, 3000);
      return () => clearTimeout(timer);
    }
  };

  checkFirstLaunch();
}, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/starter-bg.png")}
        style={styles.bg}
        resizeMode="cover"
      >
        <Animated.Image
          source={require("../../assets/logo.png")}
          style={[styles.illustration, { transform: [{ scale: logoScale }] }]}
          resizeMode="contain"
        />
        <Animated.Image
          source={require("../../assets/stetho.png")}
          style={[styles.stetho, { transform: [{ scale: stethoScale }] }]}
          resizeMode="contain"
        />
        <Animated.Image
          source={require("../../assets/qr-code-scan.png")}
          style={[styles.scanner, { transform: [{ scale: scannerScale }] }]}
          resizeMode="contain"
        />
        <Animated.Image
          source={require("../../assets/injection.png")}
          style={[styles.injection, { transform: [{ scale: injectionScale }] }]}
          resizeMode="contain"
        />
        <Animated.Image
          source={require("../../assets/hand.png")}
          style={[styles.hand, { transform: [{ scale: handScale }] }]}
          resizeMode="contain"
        />
        <Animated.Image
          source={require("../../assets/qr-code.png")}
          style={[
            styles.QrCode,
            {
              transform: [{ rotate: '45deg' }, { scale: 1 }],
            },
          ]}
          resizeMode="contain"
        />
        
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  bg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    position: "relative",
  },
  illustration: {
    width: "100%",
    height: "30%",
  },
  stetho: {
    position: "absolute",
    right: 40,
    top: 150,
  },
  scanner: {
    position: "absolute",
    left: 50,
    top: 0,
    width: 50,
  },
  hand: {
    position: "absolute",
    right: 50,
    bottom: 150,
  },
  injection: {
    position: "absolute",
    left: 30,
    bottom: 200,
  },
  QrCode: {
    position: "absolute",
    left: 70,
    bottom: -150,
    width: 45,
  },
});

export default Starter;
