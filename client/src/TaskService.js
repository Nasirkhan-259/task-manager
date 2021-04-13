import axios from "axios";

const url = "http://3.131.142.163:5000/api/posts/";

/* eslint-disable no-async-promise-executor */

class TaskService {
  // get posts
  static getTasks() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map((post) => ({
            ...post,
            createdAt: new Date(post.createdAt),
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }
  //Create post
  static insertTask(title) {
    return axios.post(url, {
      title,
    });
  }

  //delete post
  static deleteTask(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default TaskService;