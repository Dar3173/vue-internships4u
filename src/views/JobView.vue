<template>
    <div class="post-page">
    <div class="post-container">
        <div v-for="singlepost in post" :key="singlepost.id">
        <h2>{{ singlepost.titulo }}</h2>
        <p>{{ singlepost.descripcion }}</p>
        </div>
    </div>
    <div class="company-description">
        <p>logo de la empresa</p> 
        <h3>{{ post[0].empresa.nombre_empresa }}</h3>
        <h4>Quienes somos?</h4>
        <p>{{ post[0].empresa.Direccion }}</p>
    </div>
</div>
</template>

<script>
export default{
    data(){
        return{
            post:[],
        };
    },
    created:function() {
        this.consultarPostsByID();
    },
    methods:{
        consultarPostsByID(){
            fetch('http://localhost/apimydb/')
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                console.log(datosRespuesta)
                this.post=[]
                if(typeof datosRespuesta.success ==='undefined'){
                    this.post=datosRespuesta;
                }
            })
            .catch(console.log)
        },
        }
    }

</script>

<style scoped lang="scss">
.post-page{
    display: flex;
    margin: 3%;
    padding: 1%;
    display: flex;
    justify-content: center;
    height: 475px;
}
    .post-container{
        padding: 10px;
        background-color: white;
        width: 55%;
        border-radius: 15px;
        margin-right: 1%;
        line-height: 25px;
        white-space: pre-line;
    }

    .company-description{
        background-color: white;
        width: 40%;
        border-radius: 15px;
        padding: 10px;
    }

    h2,h3{
            padding: 10px;
            margin: 10px;
            color: $azul-oscuro;
        }

        p,h4{
            padding: 10px;
            margin: 10px;
        }
</style>