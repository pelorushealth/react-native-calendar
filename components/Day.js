import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import styles from './styles';

export default class Day extends Component {
  static defaultProps = {
    customStyle: {},
  }

  static propTypes = {
    caption: PropTypes.any,
    disabled: PropTypes.bool,
    customStyle: PropTypes.object,
    filler: PropTypes.bool,
    event: PropTypes.object,
    isSelected: PropTypes.bool,
    isToday: PropTypes.bool,
    isWeekend: PropTypes.bool,
    onPress: PropTypes.func,
    showEventIndicators: PropTypes.bool,
  }

  dayCircleStyle = (isWeekend, isSelected, isToday, event) => {
    const { customStyle } = this.props;
    const dayCircleStyle = [styles.dayCircleFiller, customStyle.dayCircleFiller];

    if (isSelected) {
      if (isToday) {
        dayCircleStyle.push(styles.currentDayCircle, customStyle.currentDayCircle);
      } else {
        dayCircleStyle.push(styles.selectedDayCircle, customStyle.selectedDayCircle);
      }
    }

    if (event) {
      if (isSelected) {
        dayCircleStyle.push(styles.hasEventDaySelectedCircle, customStyle.hasEventDaySelectedCircle, event.hasEventDaySelectedCircle);
      } else {
        dayCircleStyle.push(styles.hasEventCircle, customStyle.hasEventCircle, event.hasEventCircle);
      }
    }

    return dayCircleStyle;
  }

  dayTextStyle = (isDisabled, isWeekend, isSelected, isToday, event) => {
    const { customStyle } = this.props;
    const dayTextStyle = [styles.day, customStyle.day];

    if (isToday && !isSelected) {
      dayTextStyle.push(styles.currentDayText, customStyle.currentDayText);
    } else if (isToday || isSelected) {
      dayTextStyle.push(styles.selectedDayText, customStyle.selectedDayText);
    } else if (isWeekend) {
      dayTextStyle.push(styles.weekendDayText, customStyle.weekendDayText);
    }

    if (event) {
      dayTextStyle.push(styles.hasEventText, customStyle.hasEventText, event.hasEventText)
    }

    if (isDisabled) {
      dayTextStyle.push(customStyle.dayDisabledText);
    }

    return dayTextStyle;
  }

  render() {
    let { caption, customStyle } = this.props;
    const {
      disabled,
      filler,
      event,
      isWeekend,
      isSelected,
      isToday,
      showEventIndicators,
    } = this.props;

    if (filler) {
      return (
        <TouchableWithoutFeedback>
          <View style={[styles.dayButtonFiller, customStyle.dayButtonFiller]}>
            <Text style={[styles.day, customStyle.day]} />
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      const Button = disabled ? TouchableWithoutFeedback : TouchableOpacity;
      return (
        <Button onPress={this.props.onPress}>
          <View style={[styles.dayButton, customStyle.dayButton, isWeekend ? styles.weekendDayButton : null]}>
            <View style={this.dayCircleStyle(isWeekend, isSelected, isToday, event)}>
              <Text style={this.dayTextStyle(disabled, isWeekend, isSelected, isToday, event)}>{caption}</Text>
            </View>
            {showEventIndicators &&
                <View style={[
                  styles.eventIndicatorFiller,
                  customStyle.eventIndicatorFiller,
                  event && styles.eventIndicator,
                  event && customStyle.eventIndicator,
                  event && event.eventIndicator]}
                />
            }
          </View>
        </Button>
      );
    }
  }
}
