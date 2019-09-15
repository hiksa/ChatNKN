import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import { GLOBAL } from '../styles/global';
import { CText } from './custom';

type Callback = () => any;
export interface Props {
  title: string;
  onClick: Callback;
  style?: Text.propTypes.style;
  labelStyle?: Text.propTypes.style;
  disabled?: boolean;
}

/**
 * Default Button
 */
const BUTTON_DEFAULT = ({ title, onClick, style, labelStyle, disabled = false }: Props) => (
  <TouchableOpacity
    activeOpacity={GLOBAL.CTA.TouchableOpacity.default}
    style={[GLOBAL.CTA.Style.primary, GLOBAL.LAYOUT.shadow, style, {backgroundColor: disabled ? '#ccc' : GLOBAL.CTA.Style.primary.backgroundColor }]}
    disabled={disabled}
    onPress={() => onClick()}
  >
    <CText style={[GLOBAL.CTA.Style.primaryText, labelStyle]}>{title}</CText>
  </TouchableOpacity>
);

export { BUTTON_DEFAULT };
