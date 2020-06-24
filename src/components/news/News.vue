<template>
    <div ref="newsContent" class="news-content">
        <div v-if="section.title" class="page-title">
            <h1>{{section.title}} - Seção {{section.number}}</h1>
        </div>
        <div v-if="search.title" class="search-title">
            <div><h1>Pesquisa: <b>{{search.title}}</b></h1></div>
            <button @click="showSavePopup = true">Salvar</button>
        </div>
        <div id="save-popup" v-show="showSavePopup" class="save-popup">
            <div class="popup-body">
                <div class="popup-title">
                    <span>Pesquisas salvas</span>
                </div>
                <div class="popup-input-group">
                    <input ref="searchTitle" type="text" placeholder="Título do menu...">
                    <input ref="searchText" type="text" placeholder="Texto da pesquisa...">
                </div>
                <div class="popup-button-group">
                    <button @click="showSavePopup = false">Cancelar</button>
                    <button @click="saveSearch()">Ok</button>
                </div>
            </div>
        </div>
        <div class="news">
            <ul>
                <li v-for="news in newsList" :key="news.id">
                    <NewsItem :news="news" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import NewsItem from './../news/NewsItem'
import axios from 'axios'
import { baseApiURL } from '@/global.js'

export default {
    name: 'News',
    components: {
        NewsItem
    },
    data: function(){
        return {
            section: {},
            search: {},
            newsList: [],
            showSavePopup: false
        }
    },
    computed: {
        searchesList(){
            return this.$store.state.searchesList
        }
    },
    methods: {
        getNews(source = null, query = null){
            if(source) axios.get(`${baseApiURL}/news-by-source/${source}`).then(res => this.newsList = res.data.articles)
            else if(query) axios.get(`${baseApiURL}/news-by-search/${query}`).then(res => this.newsList = res.data.articles)
            else axios.get(`${baseApiURL}/news`).then(res => this.newsList = res.data.articles)
        },
        saveSearch(){
            const title = this.$refs.searchTitle.value
            const text = this.$refs.searchText.value
            axios.post(`${baseApiURL}/searches`, { title, text })
                .then(res => {
                    this.$store.commit("addSearch", res.data)
                    this.showSavePopup = false
                    this.$refs.searchTitle.value = null
                    this.$refs.searchText.value = null
                })
        }
    },
    watch: {
        $route(to) {
            if(to.params.id){
                this.search = {}
                this.section.id = to.params.id
                this.section.title = to.params.title
                this.section.number = to.params.number
                this.getNews(this.section.id, null)
            }else if(to.params.search){
                this.section = {}
                this.search.title = to.params.search
                this.getNews(null, this.search.title)
            }else{
                this.section = {},
                this.search = {},
                this.newsList = []
                this.getNews(null, null)
            }          
        },
        showSavePopup: function() {
            if(this.showSavePopup){
                this.$refs.newsContent.style.height = '80vh'     
                this.$refs.newsContent.style.overflow = 'hidden'
                return
            }else{
                this.$refs.newsContent.style.height = 'auto'     
                this.$refs.newsContent.style.overflow = 'auto'
            }
        }
    },
    mounted(){
        this.$router.push({
            name: 'news'
        })
        this.getNews(null, null)
    }
}
</script>

<style>
    .news-content ul{
        list-style: none;
        padding-left: 0;

        display:flex;
        flex-direction: column;
        flex-wrap: nowrap;
    }

    .news-content ul{
        padding: 0;
        margin: 0;
    }

    .page-title, .search-title{
        margin-bottom: 20px;
    }

    .page-title, .search-title div, .search-title button{
        background-color: rgba(0,0,0,0.05);
        color: #000;
        border-radius: 8px;
        padding: 0px 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .search-title{
        display: flex;
    }

    .search-title div{
        flex: 1;
        margin-right: 15px;
    }

    .search-title button{
        width: 150px;
        font-size: 1.5rem;
        background-color: #C4E0E5;
        color: #4CA1AF;
        font-weight: bold;
        cursor: pointer;
        transition: filter linear 0.1s;
    }

    .search-title button:focus{
        outline: none;
    }

    .search-title button:hover{
        filter: brightness(1.05);
    }

    .save-popup{
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    
    .popup-body{
        background-color: #fff;
        width: 500px;
        border-radius: 5px;
        box-shadow: 0px 8px 5px rgba(0, 0, 0, 0.4);
        overflow: hidden;
    }

    .popup-title{
        background-color: #C4E0E5;
        color: #000;
        font-weight: bold;
        border-bottom: 1px solid #000;
        padding: 20px;
    }

    .popup-title span{
        font-size: 1.3rem;
    }

    .popup-input-group{
        display: flex;
        flex-direction: column;
        padding: 20px;
    }

    .popup-input-group input{
        padding: 15px 10px;
        border-radius: 5px;
        border: 1px solid #000;
        font-size: 1rem;
    }

    .popup-input-group input:first-of-type{
        margin-bottom: 10px;
    }

    .popup-input-group input:focus{
        outline-color: #4CA1AF;
    }

    .popup-button-group{
        display: flex;
        justify-content: flex-end;
        margin: 0 20px 20px 0;
    }

    .popup-button-group button{
        background-color: #4CA1AF;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        border: none;
        font-size: 1rem;
        cursor: pointer;
        transition: transform 0.1s linear;
    }

    .popup-button-group button:first-of-type{
        margin-right: 10px;
    }

    .popup-button-group button:hover{
        transform: scale(1.05);
    }

    @media(max-width: 550px){
        .popup-body{
            width: 90%;
        }
    }
</style>
