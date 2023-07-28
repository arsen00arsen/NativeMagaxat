import * as React from 'react';
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const Button = ({
  children,
  icon,
  backgroundColor,
  isTransparent,
  isFullWidth,
  isChildrenCentered = true,
  isLoading,
  style,
  childrenContainerStyle,
  ...rest
}) => {
  let buttonBackgroundColor = backgroundColor || '#4F48EC';
  let buttonBorderColor = backgroundColor || '#4F48EC';
  let buttonBorderWidth = 1;
  let padding = 15;
  let width = 'auto';
  let align = 'center';
  // | '
  // |
  // | 'flex-end'
  // | 'space-between'
  // | 'space-around'
  // | 'space-evenly';

  if (isTransparent) {
    buttonBackgroundColor = 'transparent';
    buttonBorderWidth = 1;
    padding = 0;
  }
  if (isFullWidth) {
    width = '100%';
  }
  if (isChildrenCentered) {
    align = 'center';
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: buttonBackgroundColor,
          borderColor: buttonBorderColor,
          borderWidth: buttonBorderWidth,
          padding: padding,
          width,
        },
        style,
      ]}
      {...rest}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View
        style={[
          styles.buttonChildrenContainer,
          {
            width,
            justifyContent: align,
          },
          childrenContainerStyle,
        ]}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          children
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonChildrenContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    // width: 15,
    marginRight: 5,
  },
});
