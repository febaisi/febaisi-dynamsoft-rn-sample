import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { ScrollView, View, Text } from 'react-native';
import {
  DCVBarcodeReader,
  DCVCameraView,
  EnumBarcodeFormat,
  EnumDBRPresetTemplate,
  EnumTorchState,
} from 'dynamsoft-capture-vision-react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [reader, setReader] = useState<DCVBarcodeReader | null>(null);
  const [loaded, setLoad] = useState<boolean | null>(false);

  const initSettingForVideo = async () => {
    if (reader) {
      await reader.resetRuntimeSettings();
      let settings = await reader.getRuntimeSettings();

      // Set the expected barcode count to 0 when you are not sure how many barcodes you are scanning.
      // Set the expected barcode count to 1 can maximize the barcode decoding speed.
      settings.expectedBarcodesCount = 0;

      // Set the barcode format to read.
      settings.barcodeFormatIds =
        // EnumBarcodeFormat.BF_ONED |
        // EnumBarcodeFormat.BF_QR_CODE |
        // EnumBarcodeFormat.BF_DATAMATRIX |
        EnumBarcodeFormat.BF_PDF417;

      // Apply the new runtime settings to the barcode reader.
      await reader.updateRuntimeSettings(settings);
    }

  };

  const createDCVBarcodeReader = async () => {
    // Initialize license for the Barcode Decoding module of Dynamsoft Capture Vision.
    // The license string here is a time-limited trial license. Note that network connection is required for this license to work.
    // You can also request an extension for your trial license via the Request a Trial License link: https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&utm_source=github&package=react_native&version=9
    await DCVBarcodeReader.initLicense(
      'DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9',
    ).catch(e => {
      console.log(e);
    });
    const reader = await DCVBarcodeReader.createInstance();
    setReader(reader)
  }

  useEffect(() => {
    createDCVBarcodeReader();
    console.log("RootLayout loaded mounted");
  }, []);

  useEffect(() => {
    if (reader) {
      console.log("reader loaded")
      initSettingForVideo();
      reader?.addResultListener(results => {
        // Update the newly detected barcode results to the state.
        if (results && results.length > 0) {
          console.log("!!!!!!!!!!!!");
          console.log(results);
        }

      });
      reader?.startScanning();
      setLoad(true);
    }
  }, [reader]);


  console.log('rendering')
  return (
    <View>
      <Text>Trying Dynamsoft Barcode Scanner</Text>
      {loaded && <DCVCameraView style={{ width: '100%', height: '100%' }} />}
    </View>

  );
}
