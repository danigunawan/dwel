import React from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, Switch} from 'react-native';
import CommentIndex from '../comments/comments_index';

const styles = StyleSheet.create({
  todoDetailPage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 80,
    padding: 10,
    backgroundColor: 'white',
    // backgroundColor: '#fff',
    borderRadius:50,
    borderWidth: 1,
    borderColor: 'grey',
    // marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20
  },
  todoDetailContainer: {
    padding: 12,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    width: 300,
    // marginBottom: 5,
    backgroundColor: 'lightgray',
    borderRadius:50,
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    // marginBottom: 20
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    fontSize: 16,
    color: 'white',
  },
  commentIndex: {
    flex: 0.95,
    // marginBottom: 20

  },
  commentContainer: {
    flex: .05,
    width: 260,
    flexDirection: 'row',
    alignItems: "stretch",
    justifyContent: "center",
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'lightgray',

  },
  buttonText: {
    color: 'white',
    fontSize: 8,
    borderRadius: 50,
    // borderWidth: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 7,
    alignItems: 'center'
    // left: -10
  },
  button: {
    flex: .12,
		borderColor: 'gray',
	  justifyContent: 'space-between',
		backgroundColor: '#68a0cf',
		alignItems: 'center',
    marginLeft: 3,
    borderRadius: 50,
	},
  commentInput:{
		  flex: .88,
			borderColor: 'gray',
			fontSize: 12,
			borderWidth: 1,
      borderRadius: 12,
			backgroundColor: "white",
      paddingLeft: 10

	},
});
class TodoDetail extends React.Component {

  constructor (props) {
    super(props);
    // console.log(props);
    this.post = this.post.bind(this);
    this.state = {
      comment: "",
      comments: [],
      resolved: this.props.todo.resolved
    };
  }

  componentDidMount() {
    // console.log(this.state);
    this.setState({

      comments: this.props.todo.comments
    })
  }

  post() {
    // console.log(this.props);
    // console.log(this.state);
    fetch('http://localhost:3000/api/comments', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comments: {
          comment: this.state.comment,
          todo_id: this.props.todo.id,
          username: this.props.currentUser.username
        }})
      })
      .then((response) => response.json())
     .then(response => {
       console.log(this.state);
       console.log(this.props);
       if (response.comment){
         let comments = this.state.comments;
         comments.push(response);
         this.setState({
         comment: "",
         comments
        });

       } else {
         this.setState({
           errors: response.responseData
         });
       }
     });
    //  console.log(this.state);

    }


  render () {
    // console.log(this.state.comments);
    // console.log(this.props.todo.comments);
    return (
      <View style={styles.todoDetailPage}>
        <View style={styles.todoDetailContainer}>
          <Text style={styles.text}>
            {this.props.todo.description}
          </Text>

            <Switch
              onValueChange={(value) => this.setState({resolved: value})}

              value={this.state.resolved} />

        </View>
        <View style={styles.commentIndex}>
          <CommentIndex navigator={this.props.navigator} comments={this.state.comments}/>
        </View>
        <View style={styles.commentContainer}>
          <TextInput
            style={styles.commentInput}
            onChangeText={(text) => this.setState({comment: text})}
            value={this.state.comment}
            />
          <TouchableOpacity
            style={styles.button}
            onPress={this.post}>
            <Text style={styles.buttonText}>
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default TodoDetail;
