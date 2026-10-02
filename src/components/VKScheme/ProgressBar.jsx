// import { Text, View } from "react-native";
// import React from "react";
// import { numberToString } from "../../utils";

// const ProgressBar = ({ min, max, value, slabs }) => {
//   const progress = () => {
//     let cal = +(+value / (+max - +min)) * 100;

//     return cal > 99 ? 100 : +cal;
//   };

//   return (
//     <View
//       className="flex-1 justify-center items-center p-2 py-4 overflow-hidden "
//       style={{ elevation: 5 }}
//     >
//       <View className="w-full h-2 bg-slate-400 rounded-md relative">
//         <View className="absolute bg-red-400 w-4 h-4 rounded-full z-10 mt-[-5px] left-[0%]" />
//         {slabs.map((slab, index) =>
//           index + 1 !== slabs.length ? (
//             <View
//               className={`absolute bg-red-400 w-4 h-4 rounded-full z-10 mt-[-5px] left-[${
//                 (+slab.slabRange / max) * 100
//               }%]`}
//             />
//           ) : null
//         )}
//         {/* <View className="absolute bg-red-400 w-4 h-4 rounded-full z-10 mt-[-5px] left-[20%]" />
//         <View className="absolute bg-red-400 w-4 h-4 rounded-full z-10 mt-[-5px] left-[40%]" />
//         <View className="absolute bg-red-400 w-4 h-4 rounded-full z-10 mt-[-5px] left-[58%]" />
//         <View className="absolute bg-red-400 w-4 h-4 rounded-full z-10 mt-[-5px] left-[78%]" />
//          */}
//         <View className="absolute bg-red-400 w-4 h-4 rounded-full z-10 mt-[-5px] left-[98%]" />

//         <View
//           className={`bg-red-400 h-[100%] rounded-l-md  justify-end flex-row  `}
//           style={{ width: `${progress()}%`, position: "relative" }}
//         ></View>
//       </View>
//       <View className="flex flex-row  w-full justify-between relative">
//         {slabs.map((slab, index) =>
//           index + 1 !== slabs.length ? (
//             <Text
//               key={index}
//               className={`text-sm font-semibold  absolute left-[${
//                 (+slab.slabRange / max) * 100
//               }%]`}
//             >{`₹${numberToString(slab?.slabRange)}`}</Text>
//           ) : null
//         )}
//         <Text className="text-sm font-semibold">{`₹${numberToString(
//           min
//         )}`}</Text>
//         {/*
//         <Text className="text-sm font-semibold">{`₹${numberToString(
//           200000
//         )}`}</Text>
//         <Text className="text-sm font-semibold">{`₹${numberToString(
//           400000
//         )}`}</Text>
//         <Text className="text-sm font-semibold">{`₹${numberToString(
//           600000
//         )}`}</Text>
//         <Text className="text-sm font-semibold">{`₹${numberToString(
//           800000
//         )}`}</Text> */}
//         <Text className="text-sm font-semibold absolute left-[90%]">{`₹${numberToString(
//           max
//         )}`}</Text>
//       </View>
//     </View>
//   );
// };

// export default ProgressBar;

import { Text, View } from "react-native";
import React from "react";
import { numberToString } from "../../utils";

const ProgressBar = ({ min, max, value, slabs }) => {
  const progress = () => {
    let cal = +(+value / (+max - +min)) * 100;

    return cal > 99 ? 100 : +cal;
  };

  return (
    <View
      className="flex-1 justify-center items-center p-2 py-4 px-4 overflow-hidden "
      style={{ elevation: 5 }}
    >
      <View className="w-full h-2 bg-slate-400 rounded-md relative">
        <View className="absolute bg-red-400 w-4 h-4 rounded-full z-10 mt-[-5px] left-[0%]" />
        {slabs.map((slab, index) =>
          index + 1 !== slabs.length ? (
            <View
              style={{
                position: "absolute",
                left: `${(+slab.slabRange / max) * 100}%`,
              }}
              className={` bg-red-400 w-4 h-4 rounded-full z-10 mt-[-5px]`}
            />
          ) : null
        )}

        <View className="absolute bg-red-400 w-4 h-4 rounded-full z-10 mt-[-5px] left-[98%]" />

        <View
          className={`bg-red-400 h-[100%] rounded-l-md  justify-end flex-row  `}
          style={{ width: `${progress()}%`, position: "relative" }}
        ></View>
      </View>
      <View className="flex flex-row  w-full justify-between relative">
        {slabs.map((slab, index) =>
          index + 1 !== slabs.length ? (
            <Text
              key={index}
              style={{
                position: "absolute",
                left: `${(+slab.slabRange / max) * 100}%`,
              }}
              className={`text-sm font-semibold  `}
            >{`₹${numberToString(slab?.slabRange)}`}</Text>
          ) : null
        )}
        <Text className="text-sm font-semibold">{`₹${numberToString(
          min
        )}`}</Text>

        <Text
          style={{ position: "absolute", left: "92%" }}
          className="text-sm font-semibold "
        >{`₹${numberToString(max)}`}</Text>
      </View>
    </View>
  );
};

export default ProgressBar;
