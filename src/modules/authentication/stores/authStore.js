import { defineStore } from "pinia";


// store de authenticacion
export const useAuthStore = defineStore('auth',{
    state: ()=>({
        accessToken: null,
        authUser: null,
    }),

    getters: {
        getAccesToken : (state) => state.accessToken,
        getAuthUser: (state) => state.authUser,
    },

    actions:{

        setAccessToken(token){
            this.accessToken = token; 
        },

        setAuthUser(authUser){
            this.authUser = authUser;
        },

        setStoreAuthNull(){
            this.accessToken = null;
            this.authUser = null;
        }
    },
    persist:{
        storage: sessionStorage,
    }
});