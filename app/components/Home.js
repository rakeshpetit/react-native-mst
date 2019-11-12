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
    setTimeout(() => {
      store.todos[0].setTitle('Nice 0');
      store.todos[0].setCompleted();
    }, 5000);
  }

  render() {
    const {store} = this.props;
    console.log('todo', store.todos[0]);

    return (
      <View>
        <Text>This is Home</Text>
        {store.todos.map(todo => (
          <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
            <Text>{todo.title}</Text>
            <Text>{todo.completed ? 'Done' : 'Incomplete'}</Text>
          </View>
        ))}
      </View>
    );
  }
}

export default inject('store')(observer(Home));
