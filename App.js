import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

import { SearchBar, Detail, Station } from './src';

let orginalList = [];

const App = () => {


  const [visibleValue, setVisibleValue] = useState(false);
  const [data, setData] = useState([]);
  const [station, setStation] = useState([]);
  const [coordinate, setCoordinate] =
    useState([{ latitude: 37.78825, longitude: -122.4324 }]);
  const mapRef = useRef(null);

  const fetchData = async () => {
    const { data } = await axios.get("https://api.weather.gov/radar/stations")

    setStation(data.features);
    orginalList = [...data.features];


  }

  const positionUpdate = (value) => {

    const stationCoordinate = value.map((res, index) => {
      return {

        latitude: res.geometry.coordinates[1],
        longitude: res.geometry.coordinates[0]
      }
    })


    mapRef.current.fitToCoordinates(stationCoordinate, {
      edgePadding: {
        top: 50,
        right: 25,
        bottom: 25,
        left: 25,
      },
    });

  }
  function selfPositionUpdate(item) {
    mapRef.current.fitToCoordinates(
      [{
        latitude: item.geometry.coordinates[1],
        longitude: item.geometry.coordinates[0]
      }], {
      edgePadding: {
        top: 50,
        right: 25,
        bottom: 25,
        left: 25,
      },
    });
  }

  const renderStation = (item) => {
    return (

      <Station
        item={item}
        selectedItem={() => selfPositionUpdate(item)}
      />

    )
  }
  const selectedList = (text) => {
    const mylist = orginalList.filter((value) => {
      const mytext = text.toUpperCase();
      const myvalue = value.properties.name.toUpperCase();
      return myvalue.indexOf(mytext) > -1;
    })
    setStation(mylist)
    positionUpdate(station)
  }

  function flashCard(value) {
    setVisibleValue(true);
    setData(value);

  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        
        <MapView style={{ flex: 1 }}
          ref={mapRef}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.1822,
            longitudeDelta: 0.0821,
          }}>

          {station.map((r, index) => (
            <Marker
              onPress={() => flashCard(r)}
              key={index}
              coordinate={{
                latitude: r.geometry.coordinates[1],
                longitude: r.geometry.coordinates[0],

              }}
              title={r.properties.name}
              description={r.properties.stationType}
            />
          ))}


        </MapView>

      </View>
      <View style={{ flex: 1, position: 'absolute', top: 50 }}>
        <SearchBar onSearch={selectedList} />

        <FlatList
          horizontal
          keyExtractor={(_, index) => index.toString()}
          data={station}
          renderItem={({ item }) => renderStation(item)}


        />
        <Detail
          visibleCard={visibleValue}
          data={data}
          visibleOff={() => setVisibleValue(false)}
        />
      </View>

    </SafeAreaView>
  )
}
export default App;