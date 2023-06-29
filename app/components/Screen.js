import { SafeAreaView, StyleSheet } from "react-native";
import Constants from "expo-constants";

const Screen = ({ children, style }) => {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight + 15,
    flex: 1,
  },
});

export default Screen;
