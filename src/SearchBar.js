import React from 'react';
import { View, TextInput, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchBar=(props)=>{
  return(
    
      <View style={styles.container}>
          <View style={{justifyContent:'center'}}>
            <Icon name="magnify" size={20} color="gray" />
          </View>
          <TextInput
          placeholder="Type a station"
          onChangeText={value=>props.onSearch(value)}
          />
      </View>

  )
}
export {SearchBar};

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        padding:2,
        margin:2,
        borderRadius:8,
        borderWidth:1,
        borderColor:'gray',
        width: Dimensions.get("window").width * 0.95,
        alignSelf:"center",
        backgroundColor : "white",

    }
})

