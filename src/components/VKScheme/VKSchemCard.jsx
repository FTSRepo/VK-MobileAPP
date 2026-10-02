import { Text, View } from "react-native";
import React from "react";
import Slider from "./Slider";
import ProgressBar from "./ProgressBar";
import { useMemo } from "react";

const VKSchemeCard = ({ scheme, refetch, navigation }) => {
  
  const getSchemeValue = useMemo(() => {
    let value = { min: 0, max: 0, value: 0 };
    value["value"] = scheme.purchaseAmount || 0;

    scheme?.slabs?.forEach((slab) => {
      value["max"] = +slab?.slabRange >= +value.max ? +slab?.slabRange : +value.max;
      value["min"] = value.min
        ? +slab?.slabRange <= value.min
          ? +slab?.slabRange
          : value.min
        : +slab.slabRange;
    });

    return value;
  }, [scheme]);
  return (
    <View className=" min-h-40 rounded-md my-1 bg-white">
      <Slider scheme={scheme} refetch={refetch} navigation={navigation} />
      <View className="p-2">
        
        <Text className="text-lg text-black font-bold">
          Your Purchase Credits
        </Text>
    
        <Text className="text-md text-red-400 font-bold"> ₹{getSchemeValue?.value || 0}</Text>
        <ProgressBar
          min={0}
          max={getSchemeValue.max}
          value={getSchemeValue.value}
          slabs={scheme?.slabs||[]}
       
        />
      </View>
    </View>
  );
};

export default VKSchemeCard;
