import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import InputBox from '../../../../components/InputBox';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import Btn from '../../../../components/Btn';
import firestore from '@react-native-firebase/firestore';

const AdminAddData = ({navigation}) => {
  const [imagePath, setImagePath] = useState('');
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageURL: '',
  });

  const getImageFromUser = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      // setImagePath(image.path);
      // uploadImageFireBase();
      let path = image.path;
      let refrence = storage().ref(path);
      let task = refrence.putFile(path).then(() => {
        storage()
          .ref(path)
          .getDownloadURL()
          .then(res => {
            console.log(res);
            handleProductState(res, 'imageURL');
          });
      });
    });
  };
  // const uploadImageFireBase = async () => {
  //   let refrence = storage().ref(imagePath);
  //   let task = await refrence.putFile(imagePath);
  //   let URL = await storage().ref(imagePath).getDownloadURL();
  //   console.log(URL);
  //   handleProductState(URL, 'imageURL');
  // };
  const addDataInFirestore = () => {
    const productCollection = firestore()
      .collection('ProductsData')
      .add(productData)
      .then(() => Alert.alert('Product Added'));
  };

  const handleProductState = (text, event) => {
    setProductData(prev => {
      return {
        ...prev,
        [event]: text,
      };
    });
  };
  const emptyState = () => {
    setProductData(pre => {
      return {
        ...pre,
        description: '',
        category: '',
        imageURL: '',
        name: '',
        price: '',
      };
    });
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
        }}>
        <Text>AdminAddData</Text>
        <TouchableOpacity onPress={() => auth().signOut()}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          placeholder="Enter Product Name"
          onChangeText={text => handleProductState(text, 'name')}
          value={productData?.name}
        />
        <TextInput
          placeholder="Enter Product Description"
          onChangeText={text => handleProductState(text, 'description')}
          value={productData?.description}
        />
        <TextInput
          placeholder="Enter Product Price"
          onChangeText={text => handleProductState(text, 'price')}
          value={productData?.price}
        />
        <TextInput
          placeholder="Enter Product Category"
          onChangeText={text => handleProductState(text, 'category')}
          value={productData?.category}
        />
      </View>
      <View>
        <Button title="Upload Image" onPress={getImageFromUser} />

        {/* <TouchableOpacity onPress={() => uploadImage()}>
          <Text>Upload Image</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => null}>
          <Text>Add Product</Text>
        </TouchableOpacity> */}
      </View>
      <View style={{alignItems: 'center', margin: 10}}>
        <Btn
          title="Add Product"
          onPress={() => {
            addDataInFirestore();
            emptyState();
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation?.navigate('adminSideUserDashboard')}>
        <Text>Check Data</Text>
      </TouchableOpacity>
    </>
  );
};

export default AdminAddData;
