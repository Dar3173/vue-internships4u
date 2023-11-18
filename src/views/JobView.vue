<template>
    <h1>This is Job Page</h1>
    <div class="post-container">
        <div v-for="post in post" :key="post.id">
        <h2>{{ post.titulo }}</h2>
        <p>{{ post.descripcion }}</p>
        </div>
    </div>
    <div class="company-description">
        
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
    mounted(){
        console.log('componente job view montado')
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
    h1{
        color: red;
    }
    .post-container{
        background-color: white;
        width: 55%;
        height: 475px;
        display: flex;
        padding: 10px;
        justify-content: center;
        border-radius: 15px;
        h2{
            padding: 10px;
            margin: 10px;
        }
    }
</style>