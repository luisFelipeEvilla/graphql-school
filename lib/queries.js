'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
    getCourses: async () => {
        let db
        let courses = []
        try {
            db = await connectDB()
            courses = await db.collection('courses').find().toArray()
        } catch (error) {
            errorHandler(error);
        }
        return courses

    },
    getCourse: async (root, { id }) => {
        let db
        let course
        try {
            db = await connectDB()
            course = await db.collection('courses').findOne({ _id: ObjectID(id) })
        } catch (error) {
            errorHandler(error);
        }
        return course

    },
    getPersons: async () => {
        let db
        let students = []
        try {
            db = await connectDB()
            students = db.collection('students').find().toArray() 
        } catch (error) {
            errorHandler(error);
        }
        return students

    },
    getPerson: async ({ id }) => {
        let db
        let student = {}
        try {
            db = await connectDB()
            
        } catch (error) {
            errorHandler(error);
            student = db.collection('students').findOne( {_id: ObjectID(id) })
        }
        return student
    }
}