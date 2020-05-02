import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Button from "../../../components/buttons";
import { addTask, getTask, deleteTask } from "../../../config/redux/action";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      task: "",
    };
  }

  hendleInput = (el) => {
    this.setState({
      [el.target.id]: el.target.value,
    });
  };

  hendleCreate = () => {
    const { task } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      userId: userData.uid,
      task: this.state.task,
    };
    this.setState({
      task: "",
    });
    if (this.state.task !== "") {
      task(data);
    } else {
      alert("Masukan Task!");
    }
  };

  hendleDone = (e, task) => {
    e.stopPropagation();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      userId: userData.uid,
      todoId: task.id,
    };
    this.props.deleteTask(data);
  };

  componentDidMount() {
    const { history } = this.props;
    if (!this.props.login) {
      history.push("/react-todo-app");
    }
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData);
    this.props.getTask(userData.uid);
  }
  render() {
    const { todo } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    return (
      <div>
        <section className="dashboard">
          <p className="dashboard__text">Todo App</p>
          <p className="dashboard__desc">
            Hi, <span className="dashboard__user-text">{userData.email}</span>{" "}
            This my todo application made with react and firebase
          </p>
          <div className="dashboard__flex">
            <input
              type="text"
              className="dashboard__input"
              id="task"
              placeholder="Add task"
              value={this.state.task}
              onChange={this.hendleInput}
            />
            <Button
              title="Add"
              onClick={this.hendleCreate}
              loading={this.props.loading}
            />
          </div>
        </section>
        {this.props.loading ? (
          <div className="dashboard__text-task">Loading...</div>
        ) : todo.length > 0 ? (
          <Fragment>
            {todo.map((task) => {
              return (
                <div className="dashboard__text-task" key={task.id}>
                  {task.data.task}{" "}
                  <button onClick={(e) => this.hendleDone(e, task)}>
                    Done
                  </button>{" "}
                </div>
              );
            })}
          </Fragment>
        ) : (
          <div className="dashboard__text-task">No Task</div>
        )}
      </div>
    );
  }
}

const reduxState = (state) => ({
  login: state.isLogin,
  loading: state.isLoading,
  todo: state.task,
});

const reduxDispatch = (dispatch) => ({
  task: (data) => dispatch(addTask(data)),
  getTask: (data) => dispatch(getTask(data)),
  deleteTask: (data) => dispatch(deleteTask(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
