'use strict'

module.exports = (error) => {
    console.error(error);
    throw new Error('Connection to the server failed')  
}