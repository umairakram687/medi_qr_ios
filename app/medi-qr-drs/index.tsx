import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { RootStackParamList } from "../../constants/utils";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "medi-qr-drs/index">;

const MediQrDrs = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleNavigateNext = () => {
    navigation.navigate("qr-features/index");
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/start-pages-bg.png")}
        style={styles.bg}
        resizeMode="cover"
      >
        <Image
          source={require("../../assets/dr-medi-qr.png")}
          style={styles.illustration}
          resizeMode="contain"
        />

        <View style={styles.card}>
          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
          </View>

          <Text style={styles.title}>
            Thousand of doctors and experts to help your health
          </Text>

          <Text style={styles.subtitle}>
            Innovative community of Experienced Integrative health care practitioners who can help you
          </Text>

          <View style={styles.buttonsRow}>
            <Pressable onPress={handleNavigateNext}>
              <Text style={styles.skip}>Skip now</Text>
            </Pressable>
            <Pressable style={styles.nextBtn} onPress={handleNavigateNext}>
              <Text style={styles.nextText}>Next</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bg: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40,
  },
  illustration: {
    width: "100%",
    height: "58%",
  },
  card: {
    flex: 1,
    backgroundColor: "#1e727a",
    width: "100%",
    borderTopLeftRadius: 100,
    padding: 24,
    alignItems: "center",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#35dfef",
    width: 16,
  },
  title: {
    fontSize: RFValue(24, 812),
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
    fontFamily: "RobotoSlab-SemiBold",
    maxWidth: '90%'
  },
  subtitle: {
    fontSize: RFValue(16, 812),
    color: "#fff",
    textAlign: "center",
    lineHeight: RFValue(20, 812),
    marginBottom: 24,
    fontFamily: "Montserrat-Regular",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: "auto",
  },
  skip: {
    fontSize: RFValue(15, 812),
    fontWeight: "600",
    color: "#35dfef",
  },
  nextBtn: {
    backgroundColor: "#35dfef",
    paddingVertical: RFValue(12, 812),
    paddingHorizontal: RFValue(28, 812),
    borderRadius: 12,
  },
  nextText: {
    fontSize: RFValue(16, 812),
    fontWeight: "600",
    color: "#fff",
    fontFamily: "Montserrat-SemiBold",
  },
});

export default MediQrDrs;
