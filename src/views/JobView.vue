<template>
    <div class="post-page">
    <div class="post-container">
        <div v-for="post in post" :key="post.id">
        <h2>{{ post.titulo }}</h2>
        <p>{{ post.descripcion }}</p>
        </div>
    </div>
    <div class="company-description">
        <h2>Nombre de la compañia</h2> 
        <p> Logo de la empresa </p>
        <p>Descripcion de la compañia</p>
    </div>
</div>
</template>

<script>
export default{
    data(){
        return{
            post:[]
        }
    },
    created:function() {
        this.consultarPosts();
    },
    methods:{
        consultarPosts(){
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

<style scoped>
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

    h2{
            padding: 10px;
            margin: 10px;
        }

        p{
            padding: 10px;
            margin: 10px;
        }
</style>