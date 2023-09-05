import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Card from '../../components/Card';

const UserDashboard = ({navigation}) => {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    // const data = firestore()
    //   .collection('ProductsData')
    //   .get()
    //   .then(() => console.log());
    datawala();
  }, []);
  const datawala = async () => {
    const lala = await firestore()?.collection('ProductsData')?.get();

    setProductData(lala?.docs);
    console.log(lala?.docs);
  };
  return (
    <>
      <View style={styles.container}>
        <Text> User Dashboard</Text>

        <TouchableOpacity onPress={() => auth()?.signOut()}>
          <Text>Sign Out </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {productData === []
          ? null
          : productData?.map((v, i) => {
              return <Card key={i} {...v} />;
            })}
      </ScrollView>
    </>
  );
};

export default UserDashboard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
});
