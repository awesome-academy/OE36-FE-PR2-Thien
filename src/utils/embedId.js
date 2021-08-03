export default function getEmbedId(youtubeVideoUrl) {
    return youtubeVideoUrl? youtubeVideoUrl.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\\/&]{10,12})/)[1] : ""; 
}
