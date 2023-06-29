import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";
import Text from "../Text";

const ListItem = ({
  IconComponent,
  image,
  onPress,
  renderRightActions,
  subTitle,
  showChevrons,
  title,
}) => {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
          <View style={styles.container}>
            {IconComponent}
            {image && <Image style={styles.image} source={image} />}
            <View style={styles.detailsContainer}>
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
              {subTitle && (
                <Text numberOfLines={2} style={styles.subTitle}>
                  {subTitle}
                </Text>
              )}
            </View>
            {showChevrons && (
              <MaterialCommunityIcons
                color={colors.medium}
                name="chevron-right"
                size={25}
              />
            )}
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flexDirection: "row",
    padding: 15,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    borderRadius: 35,
    height: 70,
    width: 70,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "700",
  },
});

export default ListItem;
