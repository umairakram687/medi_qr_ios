import Icon from '@react-native-vector-icons/ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { RootStackParamList } from "../../constants/utils";

interface QrDataStructure {
  Name?: string;
  Email?: string;
  'Date of Birth'?: string;
  'Emergency Contact Name'?: string;
  'Emergency Contact Number'?: string;
  'Doctor Name'?: string;
  'Doctor Contact'?: string;
  'Medical Allergies'?: string;
  'List of Medications'?: string;
  'Preferred Hospital'?: string;
  'Insurance Provider'?: string;
  'Blood Type'?: string;
  'Additional Notes'?: string;
  text?: string;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'qr-result/index'>;

const QrResult = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const { qrData } = route.params as { qrData: string };

  const handleNavigateNext = () => {
    navigation.navigate('medi-qr-drs/index');
  };

  // Parse qrData into structured data with improved handling
  const parseQrData = (): QrDataStructure | null => {
    if (!qrData || qrData.trim() === '') return null;

    console.log('Raw qrData:', qrData); // Debug the input

    // Split by newlines and handle key-value pairs
    const pairs = qrData.split('\n').map(pair => {
      const [key, ...valueParts] = pair.trim().split(':').map(s => s.trim());
      const value = valueParts.join(':'); // Rejoin in case value contains colons
      return [key, value];
    });
    const data: QrDataStructure = {};
    const validKeys = [
      'Name',
      'Email',
      'Date of Birth',
      'Emergency Contact Name',
      'Emergency Contact Number',
      'Doctor Name',
      'Doctor Contact',
      'Medical Allergies',
      'List of Medications',
      'Preferred Hospital',
      'Insurance Provider',
      'Blood Type',
      'Additional Notes',
    ];
    pairs.forEach(([key, value]) => {
      if (key && value && validKeys.includes(key)) {
        data[key as keyof QrDataStructure] = value;
      }
    });

    console.log('Parsed data:', data);

    return Object.keys(data).length > 0 ? data : { text: qrData };
  };

  const structuredData = parseQrData();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Medi QR</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.profileTitle}> {structuredData?.Name ? 'Medical Profile' : 'Scanned Data' }</Text>
        <View style={styles.contentLayout}>
          {structuredData ? (
            <View style={styles.dataContainer}>
              {structuredData.text ? (
                <View style={styles.item}>
                  <Icon name="document-text" size={20} color="#1e727a" />
                  <Text style={styles.data}>{structuredData.text}</Text>
                </View>
              ) : (
                <>
                  {structuredData.Name && (
                    <View style={styles.item}>
                      <Icon name="person" size={20} color="#1e727a" />
                      <View style={styles.itemText}>
                        <Text style={styles.data}>Name</Text>
                        <Text style={styles.data}>{structuredData.Name}</Text>
                      </View>
                    </View>
                  )}
                  {structuredData.Email && (
                    <View style={styles.item}>
                      <Icon name="mail" size={20} color="#1e727a" />
                      <View style={styles.itemText}>
                        <Text style={styles.data}>Email</Text>
                        <Text style={styles.data}>{structuredData.Email}</Text>
                      </View>
                    </View>
                  )}
                  {structuredData['Date of Birth'] && (
                    <View style={styles.item}>
                      <Icon name="calendar" size={20} color="#1e727a" />
                      <View style={styles.itemText}>
                        <Text style={styles.data}>Date of Birth</Text>
                        <Text style={styles.data}>{structuredData['Date of Birth']}</Text>
                      </View>
                    </View>
                  )}
                  {structuredData['Emergency Contact Name'] && (
                    <View style={styles.item}>
                      <Icon name="people" size={20} color="#1e727a" />
                      <View style={styles.itemText}>
                        <Text style={styles.data}>Emergency Contact Name</Text>
                        <Text style={styles.data}>{structuredData['Emergency Contact Name']}</Text>
                      </View>
                    </View>
                  )}
                  {structuredData['Emergency Contact Number'] && (
                    <View style={styles.item}>
                      <Icon name="call" size={20} color="#1e727a" />
                      <View style={styles.itemText}>
                        <Text style={styles.data}>Emergency Contact Number</Text>
                        <Text style={styles.data}>{structuredData['Emergency Contact Number']}</Text>
                      </View>
                    </View>
                  )}
                  {structuredData['Doctor Name'] && (
                    <View style={styles.item}>
                      <Icon name="medkit" size={20} color="#1e727a" />
                      <View style={styles.itemText}>
                        <Text style={styles.data}>Doctor Name</Text>
                        <Text style={styles.data}>{structuredData['Doctor Name']}</Text>
                      </View>
                    </View>
                  )}
                  {structuredData['Doctor Contact'] && (
                    <View style={styles.item}>
                      <Icon name="call" size={20} color="#1e727a" />
                      <View style={styles.itemText}>
                        <Text style={styles.data}>Doctor Contact</Text>
                        <Text style={styles.data}>{structuredData['Doctor Contact']}</Text>
                      </View>
                    </View>
                  )}
                  {structuredData['Medical Allergies'] && (
                    <View style={styles.item}>
                      <Icon name="warning" size={20} color="#1e727a" />
                      <View style={styles.itemText}>
                        <Text style={styles.data}>Medical Allergies</Text>
                        <Text style={styles.data}>{structuredData['Medical Allergies']}</Text>
                      </View>
                    </View>
                  )}
                  {structuredData['List of Medications'] && (
                    <View style={styles.item}>
                      <Icon name="medkit" size={20} color="#1e727a" />
                      <View style={styles.itemText}>
                        <Text style={styles.data}>List of Medications</Text>
                        <Text style={styles.data}>{structuredData['List of Medications']}</Text>
                      </View>
                    </View>
                  )}
                  {structuredData['Preferred Hospital'] && (
                    <View style={styles.item}>
                      <Icon name="home" size={20} color="#1e727a" />
                      <View style={styles.itemText}>
                        <Text style={styles.data}>Preferred Hospital</Text>
                        <Text style={styles.data}>{structuredData['Preferred Hospital']}</Text>
                      </View>
                    </View>
                  )}
                  {structuredData['Insurance Provider'] && (
                    <View style={styles.item}>
                      <Icon name="shield" size={20} color="#1e727a" />
                      <View style={styles.itemText}>
                        <Text style={styles.data}>Insurance Provider</Text>
                        <Text style={styles.data}>{structuredData['Insurance Provider']}</Text>
                      </View>
                    </View>
                  )}
                  {structuredData['Blood Type'] && (
                    <View style={styles.item}>
                      <Icon name="water" size={20} color="#1e727a" />
                      <View style={styles.itemText}>
                        <Text style={styles.data}>Blood Type</Text>
                        <Text style={styles.data}>{structuredData['Blood Type']}</Text>
                      </View>
                    </View>
                  )}
                  {structuredData['Additional Notes'] && (
                    <View style={styles.item}>
                      <Icon name="document" size={20} color="#1e727a" />
                      <View style={styles.itemText}>
                        <Text style={styles.data}>Additional Notes</Text>
                        <Text style={styles.data}>{structuredData['Additional Notes']}</Text>
                      </View>
                    </View>
                  )}
                </>
              )}
            </View>
          ) : (
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Scan Data:</Text>
              {qrData.split('\n').map((line, index) => (
                <View key={index} style={styles.hierarchyItem}>
                  <Icon name="chevron-forward" size={18} color="#1e727a" />
                  <Text style={styles.data}>{line.trim() || 'No data'}</Text>
                </View>
              ))}
            </View>
          )}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.backBtn} onPress={() => navigation.navigate('user-form/index')}>
              <Text style={styles.nextText}>Back</Text>
            </Pressable>
            <Pressable style={styles.nextBtn} onPress={() => navigation.navigate('qr-scanner/index')}>
              <Text style={styles.nextText}>Scan More</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    display: 'flex',
    height: 80,
    width: '100%',
    backgroundColor: '#1e727a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 0
  },
  profileTitle: {
    fontSize: RFValue(32, 812),
    fontWeight: 'bold',
    color: '#272727ff',
    fontFamily: 'RobotoSlab-Bold',
    paddingBottom: 10,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: RFValue(32, 812),
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'RobotoSlab-Bold',
  },
  contentLayout: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 14,
    width: '100%',
    borderColor: '#d1d1d1ff',
    borderWidth: 1,
  },
  dataContainer: {
    // padding: 15,
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    borderBottomColor: '#9d9d9dff',
    borderBottomWidth: 1
  },
  hierarchyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 10,
  },
  data: {
    color: '#333333',
    marginLeft: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: RFValue(17, 812),
  },
  buttonContainer: {
    width: '100%',
    marginHorizontal: 'auto',
    gap: 5,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nextBtn: {
    backgroundColor: '#1e727a',
    paddingVertical: RFValue(12, 812),
    paddingHorizontal: RFValue(28, 812),
    borderRadius: 12,
    width: '50%'
  },
  backBtn: {
    backgroundColor: '#35dfef',
    paddingVertical: RFValue(12, 812),
    paddingHorizontal: RFValue(28, 812),
    borderRadius: 12,
    width: '44%'
  },
  nextText: {
    fontSize: RFValue(16, 812),
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default QrResult;