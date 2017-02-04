import React from 'react';
import {View, Text, TouchableOpacity, Form, Picker, ListView, TextInput, StyleSheet, Button } from 'react-native';
import TodoDetail from './todo_detail';

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    height: 60,
    width: 300,
    marginBottom: 5
  },
  todoItem: {
    flexDirection: 'row'
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  }
});

class TodosIndexItem extends React.Component {

  constructor (props) {
    super(props);
    this._onForward = this._onForward.bind(this);
  }

  _onForward() {
    this.props.navigator.push({
      component: TodoDetail,
      title: 'Todo',
      passProps: {
        todo: this.props.todo
      }
    });
  }
  //

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this._onForward}
          style={styles.todoItem}>
          <Text style={styles.text}>
            {this.props.todo.description}
          </Text>
          <Text style={styles.text}>
            resolved: {this.props.todo.resolved}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default TodosIndexItem;