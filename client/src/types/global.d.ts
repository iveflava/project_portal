import store from '@/app/model/Store';

declare global {
    export type RootState = ReturnType<typeof store.getState>
    export type AppDispatch = typeof store.dispatch
    export type AppStore = typeof store

}

export {};
