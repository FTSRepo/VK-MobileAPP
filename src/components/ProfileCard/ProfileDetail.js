import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import Spacing from "../../constants/Spacing";
import { useSelector } from "react-redux";
import moment from "moment";

const width = Dimensions.get("window").width;

const ProfileDetail = () => {
  const {
    UserInfo: { userType },
    UserProfile: {
      className,
      sectionName,
      rollNo,
      admNo,
      dob,
      classTeacher,
      fatherName,
      motherName,
      mobile,
      empCode,
      doj,
    },
  } = useSelector((state) => state.user);


  const getUserInfo = () => {
    if (userType == "Staff")
      return [
        {
          label: "Employee Id",
          value: empCode ? empCode : "N.A.",
        },
        {
          label: "Mobile",
          value: mobile ? mobile : "N.A.",
        },
        {
          label: "Date of Birth",
          value: dob ? moment(dob).format("DD-MMM-YY") : "N.A.",
        },
        {
          label: "Date of Join",
          value: doj ? moment(doj).format("DD-MMM-YY") : "N.A.",
        },
      ];

    if (userType == "SchoolAdmin")
      return [
        {
          label: "Employee Id",
          value: empCode ? empCode : "N.A.",
        },
        {
          label: "Mobile",
          value: mobile ? mobile : "N.A.",
        },
        {
          label: "Date of Birth",
          value: dob ? moment(dob).format("DD-MMM-YY") : "N.A.",
        },
        {
          label: "Date of Join",
          value: doj ? moment(doj).format("DD-MMM-YY") : "N.A.",
        },
      ];
    return [
      {
        label: "Class ",
        value: className ? className : "N.A.",
      },
      {
        label: "Roll Number",
        value: rollNo ? rollNo : "N.A.",
      },
      {
        label: "Section ",
        value: sectionName ? sectionName : "N.A.",
      },
      {
        label: "Class Teacher",
        value: classTeacher ? classTeacher : "N.A.",
      },
      {
        label: "Father Name",
        value: fatherName ? fatherName : "N.A.",
      },
      {
        label: "Mother Name",
        value: motherName ? motherName : "N.A.",
      },
      {
        label: "Mobile ",
        value: mobile ? mobile : "N.A",
      },

      {
        label: "Date of Birth",
        value: dob ? moment(dob).format("DD-MMM-YY") : "N.A.",
      },

      {
        label: "Admission Number",
        value: admNo ? admNo : "N.A",
      },
    ];
  };

  const userInfo = [...getUserInfo()];

  return (
    <ScrollView style={styles.itemContainer}>
      <View style={styles.item}>
        {userInfo.map((value, index) => (
          <View style={styles.info} key={index}>
            <Text style={styles.text}> {value.label} : </Text>
            <Text style={styles.text1}>{value.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProfileDetail;

const styles = StyleSheet.create({
  itemContainer: {
    height: 150,
    marginHorizontal: Spacing,
  },
  item: {
    flex: 1,
    margin: 3,
    paddingVertical: Spacing,
    flexDirection: "column",
    backgroundColor: Colors.white,
    borderRadius: 5,
    elevation: 1,
  },

  info: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: Spacing * 2,
  },

  text: {
    flex: 2,
    fontSize: FontSize.medium,
    overflow: "hidden",
    padding: 2,
    fontWeight: "800",
    color: Colors.gray,
  },
  text1: {
    flex: 3,
    marginHorizontal: 2,
    fontSize: FontSize.medium,
    overflow: "hidden",
    padding: 2,
    fontWeight: "800",
  },
});
