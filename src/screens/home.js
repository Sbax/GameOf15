import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Button, StyleSheet, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Wrapper from '../components/wrapper';
import useRandomWebImage from '../hooks/useRandomWebImage';
import {Screens} from './screens.enum';

function HomeScreen({navigation}) {
  const goToGameScreen = useCallback(
    image => {
      navigation.navigate(Screens.game, {image});
    },
    [navigation],
  );

  const [{image, error, loading}, getRandomWebImage] = useRandomWebImage();

  useEffect(() => {
    if (image) {
      goToGameScreen(image);
      return;
    }
  }, [image, goToGameScreen]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const chooseLocalImage = async () => {
    try {
      const {assets} = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      if (assets) {
        const [image] = assets;

        return image;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrapper>
      {loading && (
        <View style={styles.fullHeight}>
          <ActivityIndicator size="large" />
        </View>
      )}

      <View style={styles.button}>
        <Button onPress={() => goToGameScreen()} title="Numbers" />
      </View>

      <View style={styles.button}>
        <Button
          onPress={async () => {
            const image = await chooseLocalImage();
            if (image) {
              goToGameScreen(image);
            }
          }}
          title="Local Image"
        />
      </View>
      <View style={styles.button}>
        <Button onPress={getRandomWebImage} title="Random Web Image" />
      </View>

      <View style={styles.button}>
        <Button
          onPress={() => navigation.navigate(Screens.highScores)}
          title="High Scores"
        />
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  fullHeight: {
    position: 'absolute',
    height: 100,
  },
  button: {
    margin: 20,
  },
});

export default HomeScreen;
