import {observer, inject} from 'mobx-react';
import React, {Component} from 'react';
import {Text, View} from 'react-native';

export class Home extends Component {
  componentDidMount() {
    const {store} = this.props;
    setTimeout(() => {
      store.addTodo('Nice 1');
      store.addTodo('Nice 2');
      store.addTodo('Nice 3');
    }, 2000);
  }

  render() {
    const {store} = this.props;
    console.log('todo', store.todos[0]);

    return (
      <View>
        <Text>This is Home</Text>
        {store.todos.map(todo => (
          <Text>{todo.title}</Text>
        ))}
      </View>
    );
  }
}

export default inject('store')(observer(Home));
