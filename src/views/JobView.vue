<template>
    <div class="post-container">
        <h1>This is Job Page</h1>
        <div v-for="post in post" :key="post.id">
        <h2>{{ post.titulo }}</h2>
        <p>{{ post.descripcion }}</p>
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
</style>