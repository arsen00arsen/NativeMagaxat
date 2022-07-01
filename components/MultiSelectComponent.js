import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {useMultiSelectComponent} from './hooks/useMultiSelectComponent';

const MultiSelectComponent = ({interested, setValue}) => {
  const {isItemLoading, options, onSelectedItemsChange, selectedItems} =
    useMultiSelectComponent({
      selectedOptions: interested,
      setValue,
    });

  return (
    <View styles={styles.action}>
      {!isItemLoading && (
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
      )}
    </View>
  );
};

export default MultiSelectComponent;

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
