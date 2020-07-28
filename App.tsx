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
    lista: new Array<Item>()
    // lista: [ new Item('Teste', false), new Item('Tarefa 2', false) ]
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
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                  value={item.concluido}/>
                <Text 
                  style={styles.texto}>
                  {item.texto}
                </Text>
              </View>
              <Button
                title='X'
                color='red'
                onPress={() => this.removeTask(index)} />
            </View>}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.addTask}>
          <Text style={{ fontSize: 16 }}>
            Nova tarefa: 
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            onChangeText={texto => this.setState({ buffer: texto })}
            onSubmitEditing={this.addTask}
            returnKeyType="done"
            returnKeyLabel="Adicionar"
            value={this.state.buffer}/>
          <Button
            onPress={this.addTask}
            title="Adicionar" />
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }
}
 
const borda = 8;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    margin: 25,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  addTask: {
    paddingTop: 8,
    borderTopColor: '#555',
    borderTopWidth: 2
  },

  input: {
    borderColor: '#555',
    borderWidth: 1,
    padding: 5,
    borderRadius: borda,
    marginTop: 8,
    marginBottom: 8,
    alignContent: 'center',
    fontSize: 16
  },

  addLine: {
    flexDirection: 'row', 
    alignItems: 'center',
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: borda,
    borderColor: '#555',
    borderWidth: 1,
    fontSize: 12,
    marginBottom: 8,
    padding: 5
  },

  texto: {
    margin: 10,
    fontSize: 16,
    marginRight: 30
  }
});

export default App;