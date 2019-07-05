'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

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
            errorHandler(error);
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
            errorHandler(error);
        }
        
        return course
    },

    deleteCourse: async( root, { id }) => {
        let db

        try {
            db = await connectDB()
            await db.collection('courses').deleteOne({ _id: ObjectID(id) })
            course = await db.collection('courses').findOne({ _id: ObjectID(id) })
        } catch (error) {
            errorHandler(error)
        }

        return true
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
            errorHandler(error);
        }

        return course
    },

    editPerson: async( root, { id, input}) => {
        let db
        let person = {}

        try {
            db = await connectDB()
            await db.collection('students').updateOne({ _id: ObjectID(id)}, { $set: input})
            person = db.collection('students').findOne({ _id: ObjectID(id)})
        } catch (error) {
            errorHandler(error);
        }

        return person
    },

    createPerson: async (root, { input }) => {
        let db
        let person = {}

        try {
            db = await connectDB()
            person = await db.collection('students').insertOne(input)
            input._id = person.insertedId 
        } catch (error) {
            errorHandler(error);
        }

        return input
    },

    deletePerson: async (root, { id }) => {
        let db

        try {
            db = await connectDB()
            db.collection('students').deleteOne({ _id: ObjectID(id)} )
        } catch (error) {
            errorHandler(error)
        }

        return true
    }
}
