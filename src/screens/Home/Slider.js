import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Animated,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Colors from "../../constants/Colors";
import { imgUrl } from "../../http/server-base";
import SliderModal from "../../components/Home/SliderModal";
const { width } = Dimensions.get("window");
const Slider = ({ baners }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modal, setModal] = useState({ open: false, img: "" });

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width);
      setCurrentIndex(index);
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, [scrollX]);
  const flatlistRef = useRef();

  useEffect(() => {
    let interval = setInterval(() => {
      if (baners?.length > 1)
        if (currentIndex === baners.length - 1) {
          flatlistRef.current.scrollToIndex({
            index: 0,
            animation: true,
          });
        } else {
          flatlistRef.current.scrollToIndex({
            index: currentIndex + 1,
            animation: true,
          });
        }
    }, 2000);

    return () => clearInterval(interval);
  });

  const renderSlider = ({ index, item }) => {
    return (
      <Animated.View
        className="w-screen justify-center items-center "
        key={index}
      >
        <TouchableOpacity
          className="w-full max-w-[90%]  mx-auto"
          onPress={() =>
            setModal({
              open: true,
              img: item?.imagePath,
            })
          }
        >
          <Image
            className="bg-slate-300"
            source={{
              uri: `${imgUrl}${item?.imagePath}`,
            }}
            style={styles.artworkImg}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <>
      <View className="justify-center items-center my-2 ">
        <Animated.FlatList
          data={baners || []}
          ref={flatlistRef}
          renderItem={renderSlider}
          keyExtractor={(item) => item.imagePath}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: scrollX },
                },
              },
            ],
            { useNativeDriver: true }
          )}
        />
        <View className="flex-1 justify-center items-center flex-row my-2">
          {baners.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  width: currentIndex == index ? 50 : 8,
                  height: currentIndex == index ? 10 : 8,
                  borderRadius: currentIndex == index ? 5 : 4,
                  backgroundColor:
                    currentIndex == index ? Colors.primary : Colors.gray,
                  marginLeft: 5,
                }}
              ></View>
            );
          })}
        </View>
      </View>
      <SliderModal {...modal} setModal={setModal} />
    </>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
  },
  artworkWrapper: {
    marginTop: 20,
    width: 300,
    justifyContent: "center",
    height: 340,
    marginBottom: 15,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  artworkImg: {
    width: "100%",
    aspectRatio:16/9,
    borderRadius: 15,
    margin:"0 auto",
    backgroundColor:"transparent",
    resizeMode: "contain",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 5,
    textAlign: "center",
    color: Colors.plain,
  },
  artist: {
    fontSize: 18,
    fontWeight: "200",
    textAlign: "center",
    color: Colors.dark,
  },
  progressContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: "row",
  },
  progressLabelContainer: {
    width: 340,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabelText: {
    color: Colors.dark,
  },
  musicControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  bottomContainer: {
    borderTopColor: Colors.red,
    borderTopWidth: 1,
    width: width,
    alignItems: "center",
    paddingVertical: 15,
  },
  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});
