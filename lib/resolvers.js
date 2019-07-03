'use strict'

const courses = [
    {
        _id: '1',
        title: 'my js course',
        teacher: 'Luis Evilla',
        description: 'a JS course',
        topic: 'java script'
    },

    {
        _id: '2',
        title: 'node course',
        teacher: 'Julian Duque',
        description: 'a node course',
        topic: 'node js'
    },

    {
        _id: '3',
        title: 'responsive design',
        teacher: 'Leonidas Esteban',
        description: 'a frontend course',
        topic: 'CCS and HTMl'
    }
]

module.exports = {
    Query: {
        getCourses: () => courses,
        getCourse: (root, args) => {
            const course = courses.filter( course => course._id === args.id).shift()
            return course
        }  
    },
}