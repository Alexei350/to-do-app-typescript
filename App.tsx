import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, ListViewBase, CheckBox } from 'react-native';

class Item {
  constructor(texto: string, concluido: boolean) {
    this.texto = texto;
    this.concluido = concluido;
  }

  texto: string;
  concluido: boolean;
}

class App extends Component {
  state = {
    buffer: '',
    lista: [new Item('teste', false)]
  }

  addTask = () => {
    if (this.state.buffer.trim().length > 0) {
      this.setState(() => {
        return {
          lista: this.state.lista.concat(new Item(this.state.buffer, false)),
          buffer: '',
        }
      });
    }
  }

  removeTask = (index: number) => {
    this.setState(() => {
      let lista = this.state.lista.slice();

      lista.splice(index, 1);

      return {
        lista: lista
      };
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.lista}
          renderItem={({ item, index }) =>
            <View style={styles.item}>
              <CheckBox value={item.concluido} />
              <Text>{item.texto}</Text>
              <Button title='X' onPress={() => this.removeTask(index)}/>
            </View>}
          keyExtractor={(item, index) => index.toString()}
        />
        <TextInput
          style={styles.add}
          placeholder="Nova tarefa"
          onChangeText={texto => this.setState({ buffer: texto })}
          onSubmitEditing={this.addTask}
          returnKeyType="done"
          returnKeyLabel="Adicionar" />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    borderColor: 'blue',
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
    borderRadius: 5
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default App;