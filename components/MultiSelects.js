import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {useMultiSelectComponent} from './hooks/useMultiSelectComponent';

const items = [
  // this is the parent or 'item'
  {
    name: 'Fruits',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Apple',
        id: 10,
      },
      {
        name: 'Strawberry',
        id: 17,
      },
      {
        name: 'Pineapple',
        id: 13,
      },
      {
        name: 'Banana',
        id: 14,
      },
      {
        name: 'Watermelon',
        id: 15,
      },
      {
        name: 'Kiwi fruit',
        id: 16,
      },
    ],
  },
];

const MultiSelects = setValue => {
  const {isItemLoading, options, onSelectedItemsChange, selectedItems} =
    useMultiSelectComponent({
      setValue,
    });

  return (
    <View styles={styles.action}>
      <SectionedMultiSelect
        key={0}
        items={options}
        IconRenderer={Icon}
        uniqueKey="id"
        subKey="children"
        selectText="Choose your Interestings ..."
        showDropDowns={true}
        readOnlyHeadings={true}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        showCancelButton={true}
        hideSearch={true}
        modalAnimationType="slide"
        primary="red"
      />
    </View>
  );
};

export default MultiSelects;

const styles = StyleSheet.create({
  action: {
    flexDirection: 'column',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 8,
    alignItems: 'flex-start',
  },
});
