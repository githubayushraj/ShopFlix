import { configureStore } from '@reduxjs/toolkit'
import loginsignupSlice from './redux/loginsignupSlice.js'

export default configureStore({
  reducer: {
    counter: loginsignupSlice
  }
})