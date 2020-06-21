<template>
    <div class="news-content">
        <div v-if="section.title" class="page-title">
            <h1>{{section.title}} - Seção {{section.number}}</h1>
        </div>
        <div v-if="search.title" class="search-title">
            <div><h1>Pesquisa: {{search.title}}</h1></div>
            <button>Salvar</button>
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

export default {
    name: 'News',
    components: {
        NewsItem
    },
    data: function(){
        return {
            section: {},
            search: {},
            newsList: []
        }
    },
    methods: {
        getNews(source = null){
            const baseApiUrl = 'https://news-proxy.now.sh'
            if(source) axios.get(`${baseApiUrl}/api/news-by-source/${source}`).then(res => this.newsList = res.data.articles)
            else axios.get(`${baseApiUrl}/api/news`).then(res => this.newsList = res.data.articles)
        }
    },
    watch: {
        $route(to) {
            this.section.id = to.params.id
            this.section.title = to.params.title
            this.section.number = to.params.number
            this.getNews(this.section.id)
        }
    },
    mounted(){
        this.$router.push({
            name: 'news'
        })
        this.getNews()
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
        transition: all linear 0.1s;
    }

    .search-title button:focus{
        outline: none;
    }

    .search-title button:hover{
        transform: scale(1.05);
        filter: brightness(1.05);
    }
</style>
