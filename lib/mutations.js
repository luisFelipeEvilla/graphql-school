'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {
    createCourse: async (root, { input }) => {
        const defaults = {
            teacher: '',
            topic: ''
        }

        const newCourse = Object.assign(defaults, input)
        let db
        let course

        try {
            db = await connectDB()
            course = await db.collection('courses').insertOne(newCourse)
            newCourse._id = course.insertedId
        } catch (error) {
            console.error(error);
        }

        return newCourse
    },

    editCourse: async( root, { id, input }) => {
        let db
        let course

        try {
            db = await connectDB()
            await db.collection('courses').updateOne({ _id: ObjectID(id) }, {$set: input})
            course = await db.collection('courses').findOne({_id: ObjectID(id)})
        } catch (error) {
            console.error(error);
        }
        
        return course
    },

    addPeople: async (root, {CourseID, PeopleID}) => {
        let db
        let people
        let course

        try {
            db = await connectDB()
            people = await db.collection('students').findOne({ _id: ObjectID(PeopleID)})
            course = await db.collection('courses').findOne({ _id: ObjectID(CourseID)})

            if (!course || !people) throw new Error('People or course do not exists')

            await db.collection('courses').updateOne({ _id: ObjectID(CourseID)}, {$addToSet: {
                people: ObjectID(PeopleID)
            }})

            course = await db.collection('courses').findOne({ _id: ObjectID(CourseID)})
        } catch (error) {
            console.error(error);
        }

        return course
    },

    editStudent: async( root, { id, input}) => {
        let db
        let student = {}

        try {
            db = await connectDB()
            await db.collection('students').updateOne({ _id: ObjectID(id)}, { $set: input})
            student = db.collection('students').findOne({ _id: ObjectID(id)})
        } catch (error) {
            console.error(error);
        }

        return student
    },

    createStudent: async (root, { input }) => {
        let db
        let student = {}

        try {
            db = await connectDB()
            student = await db.collection('students').insertOne(input)
            input._id = student.insertedId 
        } catch (error) {
            console.error(error);
        }

        return input
    }
}
