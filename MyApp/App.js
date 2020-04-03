import React, {useState, Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
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
    axios.get('https://rickandmortyapi.com/api/character').then(response => {
      console.log('response', response);

      this.setState({list: response.data.results});
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.name}
      subtitle={'Status: ' + item.status}
      leftAvatar={{source: {uri: item.image}}}
      bottomDivider
    />
  );

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content">
          <Text>StatusBar</Text>
        </StatusBar>
        <>
          <View style={styles.body}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.list}
              renderItem={this.renderItem}
            />
          </View>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              {/* <View style={styles.sectionContainer}>
                <Text>Container 1</Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text>Container 2</Text>
              </View> */}
            </View>
          </ScrollView>
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
  body: {
    backgroundColor: Colors.white,
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
