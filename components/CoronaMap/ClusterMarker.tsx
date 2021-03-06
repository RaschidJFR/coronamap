import React from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Text from '../Text';
import { AnonymListItem, ClusterObject } from '../../data-types';
import { Colors } from '../../styles';
import { useAnimatedBool } from '../../hooks';

const BASE_DIAMETER = 30;
// BASE_DIAMETER + MAX_DELTA will be maximum marker diameter (size)
const MAX_DELTA = 20;

const styles = StyleSheet.create({
  container: {
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 15,
    shadowOpacity: 0.8,

    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    color: 'white',
  },
  callout: {
    padding: 5,
    minHeight: 40,
    minWidth: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutDescription: {
    fontSize: 12,
    color: 'black',
  },
});

interface Props {
  cluster: AnonymListItem<ClusterObject>;
  isSelected: boolean;
  onPress: (cluster: AnonymListItem<ClusterObject>) => void;
}

const LIVE_ANIM_DELTA = 0.25;
const PRESS_SCALE_DELTA = 0.25;

function ClusterMarker({ isSelected, cluster, onPress }: Props) {
  const pressScaleRef = React.useRef(new Animated.Value(1));
  const liveScaleRef = React.useRef(new Animated.Value(1));
  const isSelectedAnim = useAnimatedBool(isSelected, 200);

  const { positiveCount, showingSymptomsCount } = cluster.data;
  const size = positiveCount + showingSymptomsCount;

  const perc = Math.min(1, (0.9 * (size - 1)) / size);
  const diameter = BASE_DIAMETER + perc * MAX_DELTA;
  const backgroundColor = Colors.CLUSTER_BASE.lighten(-perc * 5);

  const backgroundColorAnim = isSelectedAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [backgroundColor, Colors.CLUSTER_SELECTED.toString()],
  });

  React.useEffect(() => {
    makeLive();
  }, []);

  function makeLive() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(liveScaleRef.current, { toValue: 1 - LIVE_ANIM_DELTA, duration: 500 }),
        Animated.timing(liveScaleRef.current, { toValue: 1, duration: 500 }),
      ])
    ).start();
  }

  function handlePressIn() {
    liveScaleRef.current.stopAnimation(() => {
      Animated.spring(pressScaleRef.current, {
        toValue: 1 - PRESS_SCALE_DELTA,
      }).start();
    });
  }

  function handlePressOut() {
    Animated.spring(pressScaleRef.current, {
      toValue: 1,
      friction: 8,
      tension: 40,
    }).start();
    makeLive();
    onPress(cluster);
  }

  return (
    <TouchableOpacity onPressIn={handlePressIn} onPress={handlePressOut} activeOpacity={1}>
      <Animated.View
        style={[
          styles.container,
          {
            height: diameter,
            width: diameter,
            borderRadius: diameter / 2,
            backgroundColor: backgroundColorAnim,
            shadowColor: isSelected ? Colors.CLUSTER_SELECTED.toString() : backgroundColor,
          },
          { transform: [{ scale: pressScaleRef.current }, { scale: liveScaleRef.current }] },
        ]}>
        <Text style={styles.number}>{size}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default React.memo(ClusterMarker);
