import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Station = (props) => {

    return (

        <View style={styles.container}>
            <TouchableOpacity style={{ flexDirection: 'row' }}
                onPress={props.selectedItem}
            >
                <Icon name="video-input-antenna" size={16} />
                <Text style={styles.text}>{props.item.properties.name}</Text>
            </TouchableOpacity>
        </View>
    )
}

export { Station }

const styles = StyleSheet.create({
    container: {

        margin: 5,
        padding: 5,
        borderRadius: 8,
        backgroundColor: 'white',
        alignSelf: 'center',

    },
    text: {
        fontSize: 16,
        paddingLeft: 5

    }
})