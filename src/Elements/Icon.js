import * as React from 'react';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
 
const Icon = ({isPrimary, useIonicons, useMaterialIcons, color, ...rest}) => {
  let iconColor = isPrimary ? '#4F48EC' : '#98A2B3';

  if (color) {
    iconColor = color;
  }

  if (useMaterialIcons) {
    return <MaterialIcons {...rest} color={iconColor} />;
  }

  return useIonicons ? (
    <Ionicons {...rest} color={iconColor} />
  ) : (
    <IconFontAwesome5 {...rest} color={iconColor} />
  );
};

export default Icon;
