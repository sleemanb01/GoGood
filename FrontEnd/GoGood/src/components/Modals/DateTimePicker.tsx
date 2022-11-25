import React, {useState} from 'react';
import {Button, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export const DateTimePicker = ({
  isDatePickerVisible,
  setDatePickerVisibility,
  setDate,
}: {
  isDatePickerVisible: boolean;
  setDatePickerVisibility: Function;
  setDate: Function;
}) => {
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
  };

  return (
    <View>
      <DateTimePickerModal
        date={new Date()}
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
