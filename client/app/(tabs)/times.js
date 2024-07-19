import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar as StatBar,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import PagerView from "react-native-pager-view";
import {
  formatDistance,
  formatDistanceStrict,
  format,
  isToday,
  isTomorrow,
} from "date-fns";
import { sv } from "date-fns/locale";
import { useGlobalSearchParams } from "expo-router";
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
import LaundryCalendar from "../../components/times/LaundryCalendar";

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

const Times = () => {
  // const { user } = useSelector((state) => state.user);

  const params = useGlobalSearchParams();
  const { initialPage } = params;

  const [containerWidth, setContainerWidth] = useState(0);
  const [tabWidth, setTabWidth] = useState(0);
  const position = useSharedValue(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(null);
  const pagerViewRef = useRef(null);

  useEffect(() => {
    position.value = initialPage;
    setCurrentPageIndex(initialPage);
  }, [params]);

  const pageScrollHandler = usePageScrollHandler({
    onPageScroll: (e) => {
      "worklet";
      position.value = e.position + e.offset;
      runOnJS(setCurrentPageIndex)(Math.round(e.position + e.offset));
    },
  });

  const indicatorStyle = useAnimatedStyle(() => {
    const indicatorWidth = containerWidth / 2;
    const translateX = !isNaN(position.value * tabWidth)
      ? position.value * tabWidth
      : 0;

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
    <SafeAreaProvider className="w-full bg-white">
      <StatusBar />
      <SafeAreaView className="flex-1" onLayout={handleContainerLayout}>
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

        {initialPage && (
          <AnimatedPagerView
            className="flex-1"
            initialPage={Number(initialPage)}
            ref={pagerViewRef}
            onPageScroll={pageScrollHandler}
          >
            <LaundryCalendar key="1" />

            <View className="flex-1 items-center justify-center" key="2">
              <Text>Bokade tider och historik</Text>
            </View>
          </AnimatedPagerView>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Times;

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

// const formatDate = (date) => {
//   if (isToday(date)) {
//     console.log("idag");
//     return;
//   }

//   if (isTomorrow(date)) {
//     console.log("imorgon");
//     return;
//   }

//   console.log(
//     formatDistanceStrict(new Date(date), new Date(), {
//       addSuffix: true,
//       unit: "day",
//       locale: sv,
//     })
//   );
// };

// useEffect(() => {
//   formatDate("2024-07-21");
// }, []);
