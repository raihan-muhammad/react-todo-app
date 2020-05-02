import firebase, { database } from "../../firebase";

export const registerAPI = data => dispatch => {
    dispatch({ type: 'CHANGE_ISLOADING', value: true })
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(res => {
                dispatch({ type: 'CHANGE_ISLOADING', value: false })
                resolve(true)
            })
            .catch(function (err) {
                //const errorCode = err.code;
                const errorMessage = err.message;
                dispatch({ type: 'ERROR_MESSAGE', value: errorMessage });
                dispatch({ type: 'CHANGE_ISLOADING', value: false });
                reject(false)
            })
    })
}

export const loginAPI = data => dispatch => {
    dispatch({ type: 'CHANGE_ISLOADING', value: true })
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(res => {
                const dataUser = {
                    email: res.user.email,
                    uid: res.user.uid,
                    isLogin: true
                }
                dispatch({ type: 'CHANGE_ISLOADING', value: false })
                dispatch({ type: 'CHANGE_LOGIN', value: true })
                dispatch({ type: 'LOGIN_USER', value: dataUser })
                resolve(dataUser);
            })
            .catch(function (err) {
                //const errorCode = err.code;
                const errorMessage = err.message;
                dispatch({ type: 'ERROR_MESSAGE', value: errorMessage });
                dispatch({ type: 'CHANGE_ISLOADING', value: false });
                reject(false)
            })
    })
}

export const addTask = data => dispatch => {
    dispatch({ type: 'CHANGE_ISLOADING', value: true });
    database.ref(`todo/${data.userId}`).push({
        task: data.task
    });
    setTimeout(() => {
        dispatch({ type: 'CHANGE_ISLOADING', value: false });
    }, 1000);
}

export const getTask = userId => dispatch => {
    dispatch({ type: 'CHANGE_ISLOADING', value: true });
    const url = database.ref(`todo/${userId}`);
    return new Promise((resolve, reject) => {
        url.on('value', function (snapshot) {
            const data = [];
            if (snapshot.val() !== null) {
                Object.keys(snapshot.val()).map(key => {
                    data.push({
                        data: snapshot.val()[key],
                        id: key
                    })
                });
            } else {
                dispatch({ type: 'CHANGE_ISLOADING', value: true });
            }

            dispatch({ type: 'CHANGE_ISLOADING', value: false });
            dispatch({ type: 'GET_TASK', value: data });
            resolve(snapshot.val());
        })
    })
}

export const deleteTask = data => dispatch => {
    const url = database.ref(`todo/${data.userId}/${data.todoId}`);
    return new Promise((resolve, reject) => {
        url.remove();
    })
}