import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';

const Card = props => {
  return (
    // <View>
    //   <Image source={{uri: props?._data?.imageURL, height: 300, width: 250}} />
    //   <Text>{props?._data?.name}</Text>
    //   <Text> Rs.{props?._data?.price}</Text>
    //   <Text>{props?._data?.description}</Text>
    //   <Text>{props?._data?.category}</Text>
    // </View>
    <>
      <View style={styles.mainView}>
        <View style={styles.imageView}>
          <Image
            source={{uri: props?._data?.imageURL ? props?._data?.imageURL :'https://us.123rf.com/450wm/mattbadal/mattbadal1911/mattbadal191100006/135029891-missing-picture-page-for-website-design-or-mobile-app-design-no-image-available-icon-vector.jpg?ver=6', height: 100, width: 80}}
          />
        </View>
        <View style={styles.imageView}>
          <Text style={styles.nameText}>{props?._data?.name}</Text>
          <Text style={styles.priceText}>₹{props?._data?.price}</Text>
          <Text style={{color:'green'}}>Free Delivery</Text>
          <Text style={{fontSize:16}}>{props?._data?.category}</Text>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
  },
  imageView: {
    margin: 10,
    borderRadius:20
  },
  nameText: {
    fontSize: 20,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 800,
  },
});

export default Card;
