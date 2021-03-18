import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

const Detail = (props) => {
    return (
        <Modal

            swipeDirection={["down"]}
            onSwipeComplete={() => props.visibleOff()}
            onBackdropPress={() => props.visibleOff()}
            isVisible={props.visibleCard}
        >
            { props.visibleCard ? (

                <View style={styles.container}>
                    <View style={styles.line}></View>
                    <Text style={styles.name}>{props.data.properties.name} ({props.data.properties.id})</Text>
                    <Text style={styles.id}>{props.data.id}</Text>
                    <View style={styles.detail}>

                        <Text>Coordinates: {props.data.geometry.coordinates[1]} / {props.data.geometry.coordinates[0]}</Text>
                        <Text>{props.data.properties.rda.timestamp}</Text>
                        <Text>Status: {props.data.properties.rda.properties.status}</Text>
                        <Text></Text>
                    </View>
                </View>
            )
                :
                null}
        </Modal>

    )
}

export { Detail }

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width * 0.97,
        height: Dimensions.get("window").height / 4,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 10,
        borderRadius: 8,
        padding: 20,
        margin: 5,
        alignSelf: 'center',
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    id: {
        fontSize: 16,

        alignSelf: 'center',
    },
    detail: {
        margin: 5,
        padding: 5,
        alignSelf: 'center',
        justifyContent: 'center'


    },
    line: {
        width: Dimensions.get("window").width / 4,
        height: 3,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        alignSelf: 'center',
        marginTop: 1,
        marginBottom: 15,
    }
})
