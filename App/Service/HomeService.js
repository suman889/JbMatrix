import HttpClient from  '../Utils/HttpClient.js'

const allPost = async (data,tab_group_id) => {
    let endpoint = 'fetch_video_tab_group_wise'
    return HttpClient.post(endpoint, data, tab_group_id)
  }