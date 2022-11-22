import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {IField} from '../../interfaces/upload';
import {dropDownStyles, imageStyles} from '../../constants/STYLES';

export function Dropdown({
  arr,
  selected,
  setSelected,
}: {
  arr: IField[];
  selected: IField | null;
  setSelected: Function;
}) {
  const [visible, setVisible] = useState(false);
  const {t} = useTranslation();

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const pressHandler = (i: number) => {
    setSelected(arr[i]);
    toggleDropdown();
  };

  function renderDropdown() {
    if (visible) {
      return (
        <View style={dropDownStyles.dropdownContainer}>
          {arr.map((curr, i) => (
            <TouchableOpacity
              key={i.toString()}
              onPress={() => pressHandler(i)}>
              <Text style={dropDownStyles.button}>{curr.fieldName}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
  }

  return (
    <TouchableOpacity
      onPress={toggleDropdown}
      style={dropDownStyles.headerContainer}>
      <Text>
        {selected === null ? t('chooseCategory') : selected.fieldName}
      </Text>
      <Image
        style={imageStyles.tinytinyLogo}
        source={require('../../images/dropDownIcon.png')}
      />
      {renderDropdown()}
    </TouchableOpacity>
  );
}
