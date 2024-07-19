import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  LayoutChangeEvent,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  Easing,
  useEvent,
  withTiming,
  runOnJS,
  useHandler,
  withSpring,
} from "react-native-reanimated";
import "react-native-reanimated";

// Definiera usePageScrollHandler hook
function usePageScrollHandler(handlers, dependencies) {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);
  const subscribeForEvents = ["onPageScroll"];

  return useEvent(
    (event) => {
      "worklet";
      const { onPageScroll } = handlers;
      if (onPageScroll && event.eventName.endsWith("onPageScroll")) {
        onPageScroll(event, context);
      }
    },
    subscribeForEvents,
    doDependenciesDiffer
  );
}

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const Test = () => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [tabWidth, setTabWidth] = useState(0);
  const position = useSharedValue(0);
  //   const pageIndex = useSharedValue(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const pagerViewRef = useRef();

  //   useEffect(() => {
  //     position.value = currentPageIndex;
  //   }, [currentPageIndex]);

  // Hantera page scroll
  const pageScrollHandler = usePageScrollHandler({
    onPageScroll: (e) => {
      "worklet";
      position.value = e.position + e.offset;
      //   pageIndex.value = Math.round(e.position + e.offset);
      runOnJS(setCurrentPageIndex)(Math.round(e.position + e.offset));
    },
  });

  const indicatorStyle = useAnimatedStyle(() => {
    const indicatorWidth = containerWidth / 2;
    const translateX = position.value * tabWidth;

    return {
      width: indicatorWidth,
      transform: [{ translateX: withTiming(translateX, { duration: 50 }) }],
    };
  });

  const switchTab = (index) => {
    position.value = index;
    pagerViewRef?.current?.setPage(index);
    setCurrentPageIndex(index);
  };

  const handleContainerLayout = useCallback((event) => {
    const { width } = event.nativeEvent.layout;

    setContainerWidth(width);
  }, []);

  const handleTabLayout = useCallback((event) => {
    const { width } = event.nativeEvent.layout;
    setTabWidth(width);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} onLayout={handleContainerLayout}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            className="w-1/2 items-center"
            onPress={() => switchTab(0)}
            onLayout={handleTabLayout}
          >
            <Text
              className={`font-normal ${currentPageIndex == 0 && "font-bold"}`}
            >
              Kalender
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-1/2 items-center"
            onLayout={handleTabLayout}
            onPress={() => switchTab(1)}
          >
            <Text
              className={`font-normal ${currentPageIndex == 1 && "font-bold"}`}
            >
              Mina tider
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.indicatorContainer}>
          <Animated.View style={[styles.indicator, indicatorStyle]} />
        </View>

        <AnimatedPagerView
          ref={pagerViewRef}
          onPageScroll={pageScrollHandler}
          style={styles.pagerView}
        >
          <View key="1" style={styles.page}>
            <Text>Page 1</Text>
            <Text>{currentPageIndex}</Text>
          </View>
          <View key="2" style={styles.page}>
            <Text>Page 2</Text>
            <Text>{currentPageIndex}</Text>
          </View>
        </AnimatedPagerView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  page: {},
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },
  indicatorContainer: {
    height: 4,
    backgroundColor: "#f0f0f0",
    marginTop: 15,
    position: "relative",
  },
  indicator: {
    height: "100%",
    backgroundColor: "orange",
    position: "absolute",
    bottom: 0,
  },
});

export default Test;
