<template>
    <div class="news-content">
        <div v-if="section.title" class="page-title">
            <h1>{{section.title}} - Seção {{section.number}}</h1>
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

    .page-title{
        background-color: rgba(0,0,0,0.05);
        color: #000;
        border-radius: 8px;
        padding: 0px 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }
</style>
