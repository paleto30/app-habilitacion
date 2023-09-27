import { defineStore } from "pinia";
import { ref } from "vue";



export const useAuthStore = defineStore('auth',{
    state: ()=>({
        accessToken: null,
        authUser: null,
        theme: ref(true),
    }),

    getters: {
        getAccesToken : (state) => state.accessToken,
        getAuthUser: (state) => state.authUser,
        getCurrentTheme: (state) => state.theme,
    },


    actions:{

        setAccessToken(token){
            this.accessToken = token; 
        },

        setAuthUser(authUser){
            this.authUser = authUser;
        },
        
        setCurrentTheme(theme){
            this.theme = theme
        }

    }
    
});