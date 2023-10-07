import { useAuthStore } from '../modules/authentication/stores/authStore.js';

const authAdminGuard = (to, from,next) =>{
    const store = useAuthStore();
    const ok = store.accessToken;
    const user = store.authUser;

    if (ok && user.rol === 2) {
        next();
    }else{
        next({name: 'login'})
    }
}

export default authAdminGuard;