import React from 'react';
import {StyleSheet, Text} from 'react-native';

import BaseHeader from './BaseHeader';

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 56,
  },
});

interface Props {}

const ResolveProblemScreenHeader: React.FunctionComponent<Props> = () => {
  return (
    <BaseHeader title={<Text style={styles.titleText}>Решить проблему</Text>} />
  );
};

export default ResolveProblemScreenHeader;
