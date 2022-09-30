import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Wrapper({children}) {
  return (
    <SafeAreaView>
      <StatusBar />

      <View style={[styles.mainContainer]}>{children}</View>
    </SafeAreaView>
  );
}

export default Wrapper;
