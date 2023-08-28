import * as React from 'react';
import {Text as BaseText} from 'react-native';

const Text = ({
  children,
  isPrimary,
  isSecondary,
  isWhite,
  isBold,
  isHeadingTitle,
  isCenter,
  hasMargin,
  style,
  isError,
  ...rest
}) => {
  let color = '';
  let fontSize = 14;
  let marginTop = 0;
  let textAlign = 'left';

  if (isSecondary) {
    color = '#000000';
    fontSize = 13;
  }

  if (isHeadingTitle) {
    fontSize = 32;
  }

  if (isPrimary) {
    color = '#4F48EC';
  }

  if (isWhite) {
    color = '#F1F1F1';
  }
  if (isError) {
    color = '#ff0000';
  }
  if (isCenter) {
    textAlign = 'center';
  }

  if (hasMargin) {
    marginTop = 10;
  }

  const fontWeight = isBold ? 'bold' : 'normal';
  return (
    <BaseText
      {...rest}
      style={[
        {
          color,
          fontWeight,
          fontSize,
          textAlign,
          marginTop,
        },
        style,
      ]}>
      {children}
    </BaseText>
  );
};

export default Text;
