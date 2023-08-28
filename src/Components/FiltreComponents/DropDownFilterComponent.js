import React, {useState, useEffect} from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import CategoryFiltre from './CategoryFiltre';
import AgeFiltre from './AgeFiltre';
import CountryFiltre from './CountryFiltre';
import UserService from '../../http/Account/account';

const DropDownFilterComponent = ({
  setCategoryId,
  isCategory,
  catId,
  setCategoryAge,
  categoryAge,
  setCategorycategoryCountry,
  categoryCountry,
}) => {
  const [active, setActive] = useState(1);
  const [age, setAge] = useState(false);
  const [country, setCountry] = useState(false);
  useEffect(() => {
    getCategoriesAge();
    getCategoriesCountries();
  }, []);

  const getCategoriesAge = async () => {
    try {
      const {data} = await UserService.getAgeCategories();
      setAge(data.data);
    } catch (err) {
      console.log(err.response);
    }
  };
  const getCategoriesCountries = async () => {
    try {
      const {data} = await UserService.getCountry();
      setCountry(data.data);
    } catch (err) {
      console.log(err.response);
    }
  };
  const titles = isCategory
    ? [{id: 1, title: 'Category'}]
    : [
        {id: 1, title: 'Category'},
        {id: 2, title: 'Age'},
        {id: 3, title: 'Country/City'},
      ];
  let content;
  if (active === 1) {
    content = <CategoryFiltre setCategoryId={setCategoryId} catId={catId} />;
  } else if (active === 2) {
    content = (
      <AgeFiltre
        age={age}
        setCategoryAge={setCategoryAge}
        categoryAge={categoryAge}
      />
    );
  } else {
    content = (
      <CountryFiltre
        country={country}
        setCategorycategoryCountry={setCategorycategoryCountry}
        categoryCountry={categoryCountry}
      />
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          {titles.map(elem => {
            return (
              <Pressable
                onPress={() => setActive(elem.id)}
                key={elem.id}
                style={{
                  backgroundColor: active === elem.id ? '#ED7B12' : '#D9D9D9',
                  paddingVertical: 18,
                  borderTopLeftRadius: elem.id === 1 && 8,
                  borderTopRightRadius: elem.id === 3 || (isCategory && 8),
                  alignItems: 'center',
                  width: isCategory ? '100%' : '33.3%',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: active === elem.id ? 'white' : 'black',
                  }}>
                  {elem.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      <View style={styles.filtrContent}>{content}</View>
    </View>
  );
};

export default DropDownFilterComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    marginTop: 50,
    zIndex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    width: '98%',
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filtrContent: {
    width: '98%',
    borderWidth: 0.5,
    borderColor: '#CCD1D2',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 0,
    overflow: 'hidden',
  },
});
