import * as React from 'react';
import Icon from '../Elements/Icon';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  I18nManager,
  StyleSheet,
} from 'react-native';

const TextField = ({
  leftIcon,
  leftIconSize,
  style,
  containerStyle,
  hasMargin,
  ...rest
}) => {
  let margin = 0;
  if (hasMargin) {
    margin = 5;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: '#FEFEFF',
          marginTop: margin,
          marginBottom: margin,
        },
        containerStyle,
      ]}>
      {leftIcon && (
        <Icon style={styles.leftIcon} name={leftIcon} size={leftIconSize} />
      )}
      <TextInput
        style={[{color: '#000000'}, styles.textField, style]}
        placeholderTextColor={'#98A2B3'}
        underlineColorAndroid="transparent"
        {...rest}
      />
    </View>
  );
};

TextField.defaultProps = {
  leftIconSize: 14,
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 5,
    height: 45,
  },
  leftIcon: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: I18nManager.isRTL ? 10 : 0,
  },
  textField: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    height: 45,
  },
  errorMesage: {
    color: 'red',
  },
});
