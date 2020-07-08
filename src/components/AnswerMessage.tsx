import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Triangle from '../assets/icons/triangle-icon.svg';

interface Props {
  author: string;
  date: string;
  text: string;
}

const styles = StyleSheet.create({
  container: {
    width: 295,
    marginBottom: 20,
    marginLeft: 'auto',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  triangle: {
    position: 'absolute',
    bottom: -1,
    right: -10,
    transform: [{rotateY: '180deg'}],
  },
  textContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  textAuthorData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  textAuthor: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  textData: {
    color: '#99aabb',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.6,
    lineHeight: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
});

// @ts-ignore
const AnswerMessage: React.FunctionComponent<Props> = (props) => {
  return (
    <View style={styles.container}>
      {/*<ImageViewDialog*/}
      {/*  open={!!showImage}*/}
      {/*  image={{uri: showImage!!}}*/}
      {/*  onClose={() => setShowImage(undefined)}*/}
      {/*/>*/}
      {/*<SliderBox*/}
      {/*  onCurrentImagePressed={(index: number) => {*/}
      {/*    setShowImage(content.photos[index].big);*/}
      {/*  }}*/}
      {/*  images={content.photos.map((value) => value.small)}*/}
      {/*  parentWidth={300}*/}
      {/*  ImageComponentStyle={styles.sliderBox}*/}
      {/*/>*/}
      <View style={styles.textContainer}>
        <View style={styles.textAuthorData}>
          <Text style={styles.textAuthor}>{props.author}</Text>
          <Text style={styles.textData}>{props.date}</Text>
        </View>
        <Text style={styles.text}>{props.text}</Text>
      </View>
      <View style={styles.triangle}>
        <Triangle width={20} height={13} />
      </View>
    </View>
  );
};

export default AnswerMessage;
