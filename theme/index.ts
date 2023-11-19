import {Appearance} from 'react-native';
import darkTheme from './dark';
import lightTheme from './light';

const colorScheme = Appearance.getColorScheme();
export const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
