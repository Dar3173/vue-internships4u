<template>
    <div class="post-container">
        <h1>This is Job Page</h1>
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
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
            fetch('/apimydb/')
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                console.log(datosRespuesta)
                this.post=[]
                if(typeof datosRespuesta[0].success ==='undefined'){
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