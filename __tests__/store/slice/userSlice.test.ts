
import userSlice, { addUserDetail, removeUserDetail } from "@/store/slices/userSlice"

// describe('loaderSlice', () => {
//   it('should return the initial state', () => {
//     const initialState: any = {
//       loading: false,
//     }

//     expect(loaderSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState)
//   })

//   it('should handle the setLoader action', () => {
//     const initialState: any = {
//       loading: false,
//     }

//     const newState = loaderSlice.reducer(initialState, setLoader(true))

//     expect(newState.loading).toBe(true)
//   })

//   it('should select the loading state using the selectLoader selector', () => {
//     const state = {
//       loader: {
//         loading: true,
//       },
//     }

//     const loading = selectLoader({ loader: state.loader })

//     expect(loading).toBe(true)
//   })
// })


describe('userSlice', () => {
    it('should return the initial state', () => {
        const initialState: any = {
            id: 0,
            email: "",
            name: "",
            role: "",
        }

        expect(userSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })

    it('should handle the addUserDetail action', () => {
        const initialState: any = {
            id: 0,
            email: "",
            name: "",
            role: "",
        }

        const userDetail = {
            id: 1,
            email: "test@test.com",
            name: "test",
            role: "admin",
        }

        const newState = userSlice.reducer(initialState, addUserDetail(userDetail))

        expect(newState.id).toEqual(userDetail.id)
        expect(newState.email).toEqual(userDetail.email)
        expect(newState.name).toEqual(userDetail.name)
        expect(newState.role).toEqual(userDetail.role)
    })

    it('should handle the removeUserDetail action', () => {
        const initialState: any = {
            id: 1,
            email: "test@test.com",
            name: "test",
            role: "admin",
        }

        const userDetail = {
            id: 0,
            email: "",
            name: "",
            role: "",
        }

        const newState = userSlice.reducer(initialState, removeUserDetail(userDetail))

        expect(newState.id).toEqual(userDetail.id)
        expect(newState.email).toEqual(userDetail.email)
        expect(newState.name).toEqual(userDetail.name)
        expect(newState.role).toEqual(userDetail.role)
    })
})
