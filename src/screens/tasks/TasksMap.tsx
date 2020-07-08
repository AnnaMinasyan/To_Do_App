import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import TaskMarker from '../../components/TaskMarker';
import {Button} from 'native-base';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

import RouteIcon from '../../assets/icons/route-icon.svg';
import GeopositionIcon from '../../assets/icons/geoposition-icon.svg';
import ExpandIcon from '../../assets/icons/expand-icon.svg';
import Checked from '../../assets/icons/checked-radio.svg';

interface Props {}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  buttonBlock: {
    position: 'absolute',
    right: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: 40,
  },
  buttonItem: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    marginBottom: 14,
  },
  buttonText: {
    color: '#666',
    fontSize: 24,
    fontWeight: '400',
    letterSpacing: 1.2,
    lineHeight: 24,
  },
  semiRoundedTop: {
    marginBottom: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#666',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  semiRoundedBottom: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  filterCollapseBlock: {
    position: 'absolute',
    paddingHorizontal: 16,
    width: '100%',
    bottom: 0,
    backgroundColor: '#fff',
  },
  filterHeader: {
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterHeaderText: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.8,
    lineHeight: 24,
  },
  radioContainer: {
    paddingTop: 16,
    paddingBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  circle: {
    marginRight: 12,
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    width: 19,
    height: 19,
  },
  radioContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  radioText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 19,
    height: 19,
    marginRight: 32,
  },
  expandedIcon: {
    transform: [{rotateX: '180deg'}],
  },
});

const TasksMapScreen: React.FunctionComponent<Props> = () => {
  const markers = [
    {
      category: 'lights',
      price: 300,
      isResolved: false,
      reworkings: 0,
      title: 'foobar',
      latlng: {
        latitude: 54.1887409,
        longitude: 37.6153379,
      },
    },
    {
      category: 'lights',
      price: 0,
      isResolved: false,
      reworkings: 0,
      title: 'barfoo',
      latlng: {
        latitude: 54.1872029,
        longitude: 37.6086538,
      },
    },
    {
      category: 'garbage',
      price: 300,
      isResolved: true,
      reworkings: 2,
      title: 'foobaz',
      latlng: {
        latitude: 54.1684465,
        longitude: 37.5956478,
      },
    },
  ];

  const problems = [
    {key: 'all', text: 'Все проблемы'},
    {key: 'free', text: 'Новые'},
    {key: 'paid', text: 'На исполнении'},
  ];

  const initialMarker = markers[0];
  const [zoom, setZoom] = useState(14);
  const [isFilterCollapsed, setFilterCollapsing] = useState(false);
  const [problem, selectProblem] = useState('Все проблемы');

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        minZoomLevel={zoom}
        maxZoomLevel={zoom}
        initialRegion={{
          ...initialMarker.latlng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {markers.map((marker, index) => (
          <Marker coordinate={marker.latlng} title={marker.title} key={index}>
            <TaskMarker
              category={marker.category}
              price={marker.price}
              isResolved={marker.isResolved}
              reworkings={marker.reworkings}
            />
          </Marker>
        ))}
      </MapView>

      <View style={styles.buttonBlock}>
        <Button style={styles.buttonItem} rounded>
          <RouteIcon width={13} height={15} />
        </Button>
        <Button
          style={[styles.buttonItem, styles.semiRoundedTop]}
          rounded
          onPress={() => setZoom(zoom + 1)}>
          <Text style={styles.buttonText}>+</Text>
        </Button>
        <Button
          style={[styles.buttonItem, styles.semiRoundedBottom]}
          rounded
          onPress={() => setZoom(zoom - 1)}>
          <Text style={styles.buttonText}>−</Text>
        </Button>
        <Button style={styles.buttonItem} rounded>
          <GeopositionIcon width={11} height={11} />
        </Button>
      </View>

      <Collapse
        isCollapsed={isFilterCollapsed}
        style={styles.filterCollapseBlock}
        onToggle={(isCollapsed: boolean) => setFilterCollapsing(isCollapsed)}>
        <CollapseHeader>
          <View style={styles.filterHeader}>
            <Text style={styles.filterHeaderText}>{problem}</Text>

            <ExpandIcon
              style={isFilterCollapsed ? styles.expandedIcon : null}
              width={16}
              height={5}
            />
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={styles.radioContainer}>
            {problems.map((item) => {
              return (
                <View key={item.key} style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.circle}
                    onPress={() => selectProblem(item.text)}>
                    {problem === item.text && (
                      <Checked style={styles.checkedCircle} />
                    )}
                  </TouchableOpacity>
                  <View style={styles.radioContent}>
                    <Text style={styles.radioText}>{item.text}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </CollapseBody>
      </Collapse>
    </View>
  );
};

export default TasksMapScreen;
