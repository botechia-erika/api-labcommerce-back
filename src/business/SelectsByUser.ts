/*import { query } from 'express'
import { db } from './../models/knex';
import { userInfo } from 'os';

const findUserByUsername = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await connection();
      const user = await collection("users").findOne({ user: userInfo });
      if (!user) return resolve(null)

      resolve(user);
    } catch (err) {
      reject(err)
    }
  })
}*/