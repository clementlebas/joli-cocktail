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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends Component {
  componentDidMount() {
    this.getRandomCocktail();

    // axios.get('https://rickandmortyapi.com/api/character').then(response => {
    //   this.setState({list: response.data.results});
    // });
  }

  getRandomCocktail = () => {
    axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(response => {
        const responseObject = JSON.parse(
          response.request._response.toString(),
        );

        const ingredients = [
          responseObject.drinks[0].strIngredient1,
          responseObject.drinks[0].strIngredient2,
          responseObject.drinks[0].strIngredient3,
          responseObject.drinks[0].strIngredient4,
        ];
        const randomCockaitl = {
          title: responseObject.drinks[0].strDrink,
          category: responseObject.drinks[0].strCategory,
          img: responseObject.drinks[0].strDrinkThumb.toString(),
          glass: responseObject.drinks[0].strGlass,
          ingredients,
          instructions: responseObject.drinks[0].strInstructions,
        };

        const randomCoktailInstructions =
          responseObject.drinks[0].strInstructions;

        console.log('randomCockaitl', randomCockaitl);

        // https://the-cocktail-db.p.rapidapi.com/list.php

        this.setState({
          // data: response.request._response.toString(),
          randomCockaitl,
        });
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      data: '',
      randomCockaitl: {},
    };
  }

  keyExtractor = (item, index) => index.toString();
  renderItem = ({item}) => {
    const {randomCockaitl} = this.state;
    console.log('randomCockaitl', randomCockaitl);
    return (
      <ListItem
        title={randomCockaitl.title}
        subtitle={'Category: ' + randomCockaitl.category}
        leftAvatar={{source: {uri: randomCockaitl.img}}}
        bottomDivider
      />
    );
  };

  render() {
    const {randomCockaitl} = this.state;

    // const formattedIngredient = randomCockaitl.ingredients.map(
    //   ingredient => {

    //     return ingredient = '-'},
    // );
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View>
          <Text style={styles.header}>JOLI COCKTAIL</Text>
        </View>

        <>
          <View style={styles.body}>
            <Image
              style={styles.image}
              source={{
                uri: randomCockaitl.img,
              }}
            />
            <Text>Nom : {randomCockaitl.title}</Text>
            <Text>Categorie : {randomCockaitl.category}</Text>
            <Text>Verre : {randomCockaitl.glass}</Text>
            <Text>Ingrédient : {randomCockaitl.ingredients}</Text>
            <Text>Instructions: {randomCockaitl.instructions}</Text>
            <View style={styles.randomButton}>
              <Button
                onPress={() => this.getRandomCocktail()}
                title="Random Cocktail"
                accessibilityLabel="Learn more about this purple button"
                color={'#841584'}
              />
            </View>

            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.list}
              renderItem={this.renderItem}
            />
          </View>

          {/* <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
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
  },
  header: {
    color: '#841584',
    fontSize: 48,
    fontFamily: 'Signika',
    textAlign: 'center',
    paddingBottom: 30,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Colors.white,
  },
  randomButton: {
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

export default App;
