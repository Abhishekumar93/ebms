// store.test.ts
import { persistor } from '@/store'
import { rootReducer } from '@/store/rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// import rootReducer from '.' // Make sure to import the actual rootReducer

describe('Redux Store Configuration', () => {
  it('should create a store with the persisted reducer', () => {
    const mockStore: any = configureStore({
      reducer: persistReducer({ key: 'TG', storage }, rootReducer),
      middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ serializableCheck: false })],
    }) as any

    expect(mockStore).toBeTruthy()
  })

  it('should create a persistor', () => {
    expect(persistor).toBeDefined()
  })
})
