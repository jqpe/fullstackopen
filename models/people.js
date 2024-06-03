import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator(v) {
        return /\d{2,3}-\d+/.test(v)
      },
      message(props) {
        return `${props.value} did not satify regex /\\d{2,3}-\\d+/`
      }
    }
  },
  name: {
    type: String,
    required: true,
    minLength: 3
  }
})

personSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Person = mongoose.model('Person', personSchema)
