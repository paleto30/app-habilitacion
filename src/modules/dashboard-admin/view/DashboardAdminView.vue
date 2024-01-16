<!-- html -->
<template>
    <div class="contenedor">

        <div class="barra_superior">
            <div class="container-fluid h-100">
                <div class="row h-100">
                    <div class="col col-4 ps-1 ps-md-4   col-sm-3 col-md-2  d-flex align-items-center ">
                        <img src="../../../assets/Manzanavector.svg" style="width: 45px; margin-right: 10px;" alt=""
                            srcset="">
                        <div class="fs-2 uts pt-1">UTS</div>
                    </div>
                    <div
                        class="col col-8 ps-3 col-sm-9 col-md-10  d-flex align-items-center justify-content-lg-end justify-content-md-end justify-content-end">

                        <div class="nameVista me-5">
                            <h5 class="mb-0 textt">Administrador</h5>
                        </div>

                        <!-- boton del menu en mobil -->
                        <button class="btn btn-success burger" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                            <span class="icon-menu"></span>
                        </button>

                        <!-- menu en modo mobil -->
                        <div class="offcanvas offcanvas-start barraMenu" tabindex="-1" id="offcanvasExample"
                            aria-labelledby="offcanvasExampleLabel">
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="offcanvasExampleLabel">
                                    <span class="icon-th-large" style="font-size: 30px; color: #63AF0A"></span>
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                                    aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body barra_lateral_mobil">
                                <!-- componente de la barra de navegacion -->
                                <BarraMenu :menus="itmes" />

                                <!-- pendiente con esto OJJOOOOO -->
                                <div class="configs">
                                    <LogoutUsers />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section class="cuerpo">

            <!-- barra lateral - modo desktop -->
            <div class="barra_lateral">
                <!-- componente de la barra de navegacion  -->
                <BarraMenu :menus="itmes" />

                <!-- pendiente con esto OJJOOOOO -->
                <div class="configs ">
                    <LogoutUsers />
                </div>
            </div>

            <!-- espacio donde va el formulario o las tablas -->
            <div class="contenido">
                <router-view />
            </div>
        </section>
    </div>
</template>


<!-- Js -->
<script setup>

// coomponente del menu
import BarraMenu from '../../../shared/components/BarraMenus.vue';

// componente de logout
import LogoutUsers from '../../../shared/components/LogoutUsers.vue';

// ITEMS PARA LA BARRA DE MENU 
const itmes = [
   /*  {
        text: 'Carreras',
        nameRoute: 'view-carreras',
        icon: 'icon-sitemap'
    },
    {
        text: 'Profesores',
        nameRoute: 'view-profes',
        icon: 'icon-briefcase'
    }, */
    {
        text: 'Estudiantes',
        nameRoute: 'view-estudiantes',
        icon: 'icon-stumbleupon'
    },
   /*  {
        text: 'Pensum',
        nameRoute: 'view-pensums',
        icon: 'icon-cubes'
    },
    {
        text: 'Materias',
        nameRoute: 'view-materias',
        icon: 'icon-fire'
    }, */
    {
        text: 'Habilitaciones',
        nameRoute: 'view-habilitacion',
        icon: 'icon-megaphone'
    },

];











</script>


<!-- CSS -->
<style scoped>
.contenedor {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.barra_superior {
    height: 65px;
    width: 100%;
    border-bottom: 0.1px solid rgb(223, 223, 223);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    background-color: rgb(255, 255, 255);
}



.uts {
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 800;
}





.cuerpo {
    display: flex;
}


.barra_lateral {
    position: sticky;
    width: 250px;
    background-color: rgb(250, 250, 250);
    height: calc(100vh - 65px);
    border-right: 0.1px solid rgb(223, 223, 223);
}

.barra_lateral_mobil {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}


.barra_lateral {
    display: flex;
    flex-direction: column;
    align-content: end;
    justify-content: space-between;
}


/* background-color: rgb(29, 48, 19); */
/*  background-color: rgb(216, 224, 212); */

.contenido {
    width: calc(100% - 250px);
    height: calc(100vh - 65px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: linear-gradient(to right, rgba(81, 56, 126, 0.678), rgba(32, 112, 79, 0.678)),
        url(../../../assets/xd.jpg) no-repeat center center fixed;
    background-size: cover;
    background-repeat: no-repeat;
}



.burger {
    display: none;
}



.nameVista {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Nunito Sans', sans-serif;
    /*  color: #13860f; */
    color: rgb(88, 156, 10);
}


.textt {
    font-weight: 700;
}


/* pendiente con esto */
.configs {
    height: calc(100% - 600px);
    display: flex;
    align-items: end;
    padding: 10px;
}









@media (max-width: 991px) {

    .barra_lateral {
        display: none;
    }


    .contenido {
        width: 100%;
    }

    .burger {
        display: block;
    }

    .nameVista {
        display: none;
    }
}


@media (max-width: 575px) {
    .nameVista {
        display: none;
    }
}


@media (max-width: 550px) {
    .nameVista {
        display: none;
    }

    .contenido {
        padding: 0;
    }
}
</style>