import {observer, inject} from 'mobx-react';
import React, {Component} from 'react';
import {Button, TextInput, Text, TouchableOpacity, View} from 'react-native';

export class Home extends Component {
  state = {todoItem: ''};
  componentDidMount() {
    const {store} = this.props;
    setTimeout(() => {
      store.addTodo('Sample 1');
      store.addTodo('Sample 2');
      store.addTodo('Sample 3');
    }, 2000);
  }
  onChangeText = todoItem => {
    console.log(todoItem);
    this.setState({todoItem});
  };

  addTodo = () => {
    const {store} = this.props;
    if (this.state.todoItem) {
      store.addTodo(this.state.todoItem);
      this.setState({todoItem: ''});
    }
  };

  toggleTodo = todo => {
    todo.toggleCompleted();
  };

  render() {
    const {store} = this.props;
    console.log('todo', store.todos[0]);

    return (
      <View>
        <Text>Add a Todo</Text>
        <TextInput
          style={{
            padding: 20,
            marginHorizontal: 20,
            backgroundColor: 'lightgray',
          }}
          value={this.state.todoItem ? this.state.todoItem : ''}
          onChangeText={text => this.onChangeText(text)}
        />
        <Button onPress={this.addTodo} title={'Add'} />
        <Text>These are incomplete Todos</Text>
        <View
          style={{
            margin: 20,
          }}>
          {store.incompleteTodos.map((todo, index) => (
            <TouchableOpacity
              onPress={() => this.toggleTodo(todo)}
              key={index}
              style={{
                justifyContent: 'space-around',
                flexDirection: 'row',
                backgroundColor: 'lightblue',
              }}>
              <Text>{todo.title}</Text>
              <Text>{todo.completed ? 'Done' : 'Incomplete'}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text>These are completed Todos</Text>
        <View
          style={{
            margin: 20,
          }}>
          {store.completedTodos.map((todo, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => this.toggleTodo(todo)}
              style={{
                justifyContent: 'space-around',
                flexDirection: 'row',
                backgroundColor: 'lightgreen',
              }}>
              <Text>{todo.title}</Text>
              <Text>{todo.completed ? 'Done' : 'Incomplete'}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

export default inject('store')(observer(Home));
