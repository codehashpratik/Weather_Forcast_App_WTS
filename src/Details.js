import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icons} from './Themes';
import {API_KEY, API_KEY_FORCAST} from './Constants';
import LinearGradient from 'react-native-linear-gradient';

const Details = props => {
  const {name} = props.route.params;
  const [data, setData] = useState('');
  // const [locationKey, setLocationKey] = useState('');
  const [forcastData, setForcastData] = useState([]);
  const [isForcast, setIsForcast] = useState(false);
  const Today = 'Today';
  const Tomorrow = 'Tomorrow';

  function formatDate(dateString) {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Get the options for formatting the date
    const options = {month: 'short', day: '2-digit'};

    // Use toLocaleDateString to format the date
    return date.toLocaleDateString('en-US', options).replace(',', '');
  }

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name.trim()}&appid=${API_KEY}`,
    )
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, []);

  function fetchLocationId(cityName) {
    fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY_FORCAST}&q=${cityName}`,
    )
      .then(res => res.json())
      .then(res => {
        // setLocationKey(res[0].Key);
        // forcastFunc(locationKey);
        fetch(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${res[0].Key}?apikey=${API_KEY_FORCAST}`,
        )
          .then(res => res.json())
          .then(res => {
            // console.log(res);
            setForcastData(res.DailyForecasts);
            console.log(forcastData);
            setIsForcast(true);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

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
        <ScrollView
          showsVerticalScrollIndicator={false}
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
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      marginTop: 10,
                    }}>
                    {data['weather'][0]['main']}
                  </Text>
                  <Image
                    source={
                      data['weather'][0]['main'] == 'Haze'
                        ? Icons.haze
                        : data['weather'][0]['main'] == 'Clouds'
                        ? Icons.cloudy
                        : data['weather'][0]['main'] == 'Mist'
                        ? Icons.mist
                        : data['weather'][0]['main'] == 'Clear'
                        ? Icons.sunny
                        : data['weather'][0]['main'] == 'Rain'
                        ? Icons.rainy
                        : data['weather'][0]['main'] == 'Thunderstorm'
                        ? Icons.foggy
                        : Icons.sunny
                    }
                    style={{
                      height: 30,
                      width: 30,
                      resizeMode: 'contain',
                      marginTop: 10,
                      marginLeft: 10,
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Image
                  source={Icons.temperature}
                  style={{
                    height: 25,
                    width: 25,
                    resizeMode: 'contain',
                    tintColor: 'white',
                    marginTop: 48,
                    marginRight: 5,
                  }}
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 30,
                    marginTop: 40,
                  }}>
                  {(data['main']['temp'] - 273).toFixed(2)}&deg; C
                </Text>
              </View>

              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  marginTop: 100,
                  marginBottom: 30,
                }}>
                Current Weather Details
              </Text>

              <View
                style={{
                  height: 160,
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
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={Icons.wind}
                      style={{
                        height: 20,
                        width: 20,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        marginLeft: 5,
                      }}>
                      Wind
                    </Text>
                  </View>

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
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={Icons.pressureWeather}
                      style={{
                        height: 20,
                        width: 20,
                        resizeMode: 'contain',
                        tintColor: 'white',
                      }}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        marginLeft: 5,
                      }}>
                      pressure
                    </Text>
                  </View>
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
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={Icons.humidity}
                      style={{
                        height: 20,
                        width: 20,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        marginLeft: 5,
                      }}>
                      Humidity
                    </Text>
                  </View>
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
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={Icons.visibility}
                      style={{
                        height: 20,
                        width: 20,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        marginLeft: 5,
                      }}>
                      Visibility
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                    }}>
                    {data['visibility']}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => fetchLocationId(name)}
                style={{
                  height: 40,
                  width: 120,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                  marginBottom: 30,
                }}>
                <LinearGradient
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  colors={['blue', 'skyblue']}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 1}}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '500',
                      fontSize: 13,
                    }}>
                    Check Forcast
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              {isForcast ? (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: 9,
                    alignItems: 'center',
                    marginBottom: 70,
                  }}>
                  {forcastData.map((item, index) => {
                    const formattedDate = formatDate(item.Date);
                    return (
                      <View
                        style={{
                          height: 180,
                          width: 211,
                          paddingHorizontal: 10,
                          borderWidth: 2,
                          borderColor: 'grey',
                        }}>
                        <View
                          style={{
                            height: 40,
                            width: '100%',
                            borderColor: 'grey',
                            borderBottomWidth: 1,
                            justifyContent: 'center',
                            marginBottom: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 15,
                              color: 'white',
                              textAlign: 'center',
                              fontWeight: '500',
                            }}>
                            {index == 0
                              ? Today
                              : index == 1
                              ? Tomorrow
                              : formattedDate}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 11,
                              marginTop: 4,
                            }}>
                            Day
                          </Text>
                          <Text
                            style={{
                              color: 'skyblue',
                              fontSize: 11,
                              marginTop: 4,
                            }}>
                            {item.Day.IconPhrase}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 11,
                              marginTop: 4,
                            }}>
                            Night
                          </Text>
                          <Text
                            style={{
                              color: 'skyblue',
                              fontSize: 11,
                              marginTop: 4,
                            }}>
                            {item.Night.IconPhrase}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 11,
                              marginTop: 4,
                            }}>
                            Max Temp
                          </Text>
                          <Text
                            style={{
                              color: 'skyblue',
                              fontSize: 11,
                              marginTop: 4,
                            }}>
                            {item.Temperature.Maximum.Value} &deg; C
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 11,
                              marginTop: 4,
                            }}>
                            Min Temp
                          </Text>
                          <Text
                            style={{
                              color: 'skyblue',
                              fontSize: 11,
                              marginTop: 4,
                            }}>
                            {item.Temperature.Minimum.Value} &deg; C
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              ) : null}
            </View>
          ) : null}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Details;
