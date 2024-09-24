import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icons} from './Themes';
import {API_KEY} from './Constants';

const Details = props => {
  const {name} = props.route.params;
  const [data, setData] = useState('');

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`,
    )
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ImageBackground
        source={Icons.back}
        style={{
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Home');
          }}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3916/3916840.png',
            }}
            style={{
              tintColor: 'white',
              height: 30,
              width: 30,
              resizeMode: 'contain',
              marginLeft: 30,
              marginTop: 30,
            }}
          />
        </TouchableOpacity>

        {data ? (
          <View
            style={{
              //   justifyContent: 'space-evenly',
              alignItems: 'center',
              flex: 1,
              //   backgroundColor: 'blue',
            }}>
            <View
              style={{
                marginTop: 70,
              }}>
              <Text
                style={{
                  fontSize: 33,
                  color: 'white',
                  textAlign: 'center',
                }}>
                {name}
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                }}>
                {data['weather'][0]['main']}
              </Text>
            </View>
            <Text
              style={{
                color: 'white',
                fontSize: 30,
                marginTop: 40,
              }}>
              {(data['main']['temp'] - 273).toFixed(2)}&deg; C
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                marginTop: 100,
                marginBottom: 30,
              }}>
              Weather Details
            </Text>

            <View
              style={{
                height: 150,
                width: '80%',
                // backgroundColor: 'yellow',
                borderWidth: 2,
                borderColor: 'grey',
                paddingHorizontal: 20,
                borderRadius: 10,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                  }}>
                  Wind
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                  }}>
                  {data['wind']['speed']}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                  }}>
                  Pressure
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                  }}>
                  {data['main']['pressure']}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                  }}>
                  Humidity
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                  }}>
                  {data['main']['humidity']} %
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                  }}>
                  Visibility
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                  }}>
                  {data['visibility']}
                </Text>
              </View>
            </View>
          </View>
        ) : null}
      </ImageBackground>
    </View>
  );
};

export default Details;
