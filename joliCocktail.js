import React, {useState, Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  Button,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import axios from 'axios';

import {Colors} from 'react-native/Libraries/NewAppScreen';

class JoliCocktail extends Component {
  componentDidMount() {
    this.getRandomCocktail();

    // axios.get('https://rickandmortyapi.com/api/character').then(response => {
    //   this.setState({list: response.data.results});
    //   // console.log('list', list);
    // });

    // axios
    //   .get('https://the-cocktail-db.p.rapidapi.com/list.php')
    //   .then(response => {
    //     const responseObject = JSON.parse(response.toString());

    //     console.log('responseObject', responseObject);
    //   });
  }

  getRandomCocktail = () => {
    axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(response => {
        const responseObject = JSON.parse(
          response.request._response.toString(),
        );

        // for (let i = 0; i <= 14; i++) {
        //   let list = `responseObject.drinks[0].strIngredient${i}`;
        //   responseObject.drinks[0].strIngredient;
        //   let ingredients = [];
        //   ingredients.push(list);
        //   console.log('ingredients', ingredients);
        // }
        const ingredients = [
          responseObject.drinks[0].strIngredient1,
          responseObject.drinks[0].strIngredient2,
          responseObject.drinks[0].strIngredient3,
          responseObject.drinks[0].strIngredient4,
          responseObject.drinks[0].strIngredient5,
          responseObject.drinks[0].strIngredient6,
          responseObject.drinks[0].strIngredient7,
          responseObject.drinks[0].strIngredient8,
          responseObject.drinks[0].strIngredient9,
          responseObject.drinks[0].strIngredien10,
          responseObject.drinks[0].strIngredient11,
          responseObject.drinks[0].strIngredient12,
          responseObject.drinks[0].strIngredient13,
          responseObject.drinks[0].strIngredient14,
        ];

        const formatedIngredients = ingredients.map(ing => {
          while (ing) {
            return `\n - ${ing}`;
          }
        });

        const randomCocktail = {
          title: responseObject.drinks[0].strDrink,
          category: responseObject.drinks[0].strCategory,
          img: responseObject.drinks[0].strDrinkThumb.toString(),
          glass: responseObject.drinks[0].strGlass,
          ingredients: formatedIngredients,
          instructions: responseObject.drinks[0].strInstructions,
        };

        this.setState({
          // data: response.request._response.toString(),
          randomCocktail,
        });
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      // list: [],
      // data: '',
      randomCocktail: {},
    };
  }

  keyExtractor = (item, index) => index.toString();
  renderItem = ({item}) => {
    const {randomCocktail} = this.state;
    return (
      <ListItem
        title={randomCocktail.title}
        subtitle={'Category: ' + randomCocktail.category}
        leftAvatar={{source: {uri: randomCocktail.img}}}
        bottomDivider
      />
    );
  };

  render() {
    const {randomCocktail} = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.top}>
          <Image
            style={styles.logo}
            source={require('./img/jolicockail.png')}
          />
        </View>

        <>
          <ScrollView style={{backgroundColor: '#ffeee6'}}>
            <View style={styles.header}>
              <Image
                style={styles.image}
                source={{
                  uri: randomCocktail.img,
                }}
              />
              <Text>Nom : {randomCocktail.title}</Text>
              <Text>Categorie : {randomCocktail.category}</Text>
              <View style={styles.randomButtonContainer}>
                <Button
                  onPress={() => this.getRandomCocktail()}
                  title="Random Cocktail"
                  accessibilityLabel="Learn more about this purple button"
                  color={'#fec282'}
                  buttonStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30,
                    width: 100,
                    paddingBottom: 30,
                  }}
                />
              </View>
            </View>
            <View style={styles.body}>
              <Text>
                Verre : {randomCocktail.glass} {'\n'}
              </Text>
              <Text>Ingrédient : {randomCocktail.ingredients}</Text>
              <Text>
                {'\n'}Instructions: {randomCocktail.instructions}
              </Text>
            </View>
          </ScrollView>
          {/* <View>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={randomCocktail}
              renderItem={this.renderItem}
            />
          </View> */}

          {/* <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.header}>
              <View style={styles.sectionContainer}>
                <Text>{this.state.data}</Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text>Container 2</Text>
              </View>
            </View>
          </ScrollView> */}
        </>
      </>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    // width: 350,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
    marginTop: 30,
    borderRadius: 10,
    borderColor: 'black',
  },
  logo: {
    // position: 'relative',
    width: 400,
    height: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  body: {
    paddingBottom: 30,
    margin: 10,
  },
  title: {
    color: '#841584',
    fontSize: 48,
    fontFamily: 'Signika',
    textAlign: 'center',
    paddingBottom: 30,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Colors.white,
  },
  randomButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default JoliCocktail;
