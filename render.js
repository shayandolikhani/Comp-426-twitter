$(".post").on("click", draftNew);
$(".posttweet").on("click", postTweet);
$(".cancel").on("click", cancelDraft);


export const renderHome = function() {
    homeTweets();
    
}

export async function homeTweets() {
    const $root = $('#root');
    const result = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
    });

    $root.empty();
    for (let i = 0; i < 50; i++) {
    if (result.data[i]["isMine"] == true && result.data[i]["type"] != "retweet") {
        $root.append(
            `<div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4 has-text-centered">@${result.data[i]["author"]}</p>
                </div>
              </div>
          
              <div class="content is-large has-text-centered">
              ${result.data[i]["body"]}
              </div>
              <span class = "is-italic"><p class ="has-text-centered">${(new Date(result.data[i]["createdAt"])).toLocaleTimeString()}</p></span>
              <p class="subtitle is-6 has-text-centered"><i class="like ${result.data[i]["isLiked"]} fas fa-heart" id=${result.data[i]["id"]}></i> ${result.data[i]["likeCount"]} <i class="retweet fas fa-retweet" data-id=${result.data[i]["id"]} author=${result.data[i]["author"]}></i> ${result.data[i]["retweetCount"]} <i class="reply fas fa-reply" data-id=${result.data[i]["id"]} author=${result.data[i]["author"]}></i> ${result.data[i]["replyCount"]}</p>
                <p class = "has-text-centered"><button class = "edit${result.data[i]["id"]} button" value=${result.data[i]["id"]} data-text=${result.data[i]["body"]}><i class="fas fa-edit"></i></button> <button class = "remove button" value=${result.data[i]["id"]}><i class="fas fa-trash"></i></button></p>
              </div>
            </div>`
            
            );
        $(`.edit${result.data[i]["id"]}`).on("click", edit);
        $(".remove").on("click", deleteTweet);
        $root.append(`<br>`); 
      } else if (result.data[i]["isMine"] == true && result.data[i]["type"] == "retweet") {
          $root.append(
            `<div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4 has-text-centered">@${result.data[i]["author"]}</p>
                </div>
              </div>
          
              <div class="content is-large has-text-centered">
              ${result.data[i]["body"]}
              </div>
              <span class = "is-italic"><p class ="has-text-centered">${(new Date(result.data[i]["createdAt"])).toLocaleTimeString()}</p></span>
              <p class="subtitle is-6 has-text-centered"><i class="like ${result.data[i]["isLiked"]} fas fa-heart" id=${result.data[i]["id"]}></i> ${result.data[i]["likeCount"]} <i class="retweet fas fa-retweet" data-id=${result.data[i]["id"]} author=${result.data[i]["author"]}></i> ${result.data[i]["retweetCount"]} <i class="reply fas fa-reply" data-id=${result.data[i]["id"]} author=${result.data[i]["author"]}></i> ${result.data[i]["replyCount"]}</p>
                <p class = "has-text-centered"><button class = "remove button" value=${result.data[i]["id"]}><i class="fas fa-trash"></i></button></p>
              </div>
            </div>`
            
            );
        $(".remove").on("click", deleteTweet);
        $root.append(`<br>`);
        } else {
      $root.append(
        `<div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4 has-text-centered">@${result.data[i]["author"]}</p>
            </div>
          </div>
      
          <div class="content is-large has-text-centered">
          ${result.data[i]["body"]}
          </div>
            <span class = "is-italic has-text-centered"><p class= "has-text-centered">${(new Date(result.data[i]["createdAt"])).toLocaleTimeString()}</p></span>
            <p class="subtitle is-6 has-text-centered"><i class="like ${result.data[i]["isLiked"]} fas fa-heart" id=${result.data[i]["id"]}></i> ${result.data[i]["likeCount"]} <i class="retweet fas fa-retweet" data-id=${result.data[i]["id"]} author=${result.data[i]["author"]}></i> ${result.data[i]["retweetCount"]} <i class="reply fas fa-reply" data-id=${result.data[i]["id"]} author=${result.data[i]["author"]}></i> ${result.data[i]["replyCount"]}</p>
          </div>
        </div>`
        
        );
    $root.append(`<br>`);
    }

    }
    $(".like").on("click", likeTweet);
    $(".reply").on("click", replyDraft);
    $(".retweet").on("click", retweetDraft);
    
}

export function draftNew() {
  $(".post").replaceWith(`
  <div class= "draft" style = "position: relative;">
  <textarea class="textarea is-large" placeholder="Post a new tweet"></textarea>
  <button class = "cancel button has-text-white is-rounded has-background-info" style="position:absolute;bottom:2%;right:2%;">Cancel</button>
  <button class = "posttweet button has-text-white is-rounded has-background-info" style="position:absolute;bottom:2%;left:2%;">Post</button>
  </div>`);

  $(".posttweet").on("click", postTweet);
  $(".cancel").on("click", cancelDraft);
}

export function cancelDraft() {
  $(".draft").replaceWith(`
  <div style="position:fixed;bottom:3%;right:3%;">
  <button class = "post button is-large is-rounded has-background-info">
  <span style="color:white;"><i class="fas fa-pen"></i></span> </button>
  </div>
  `)
  $(".post").on("click", draftNew);

}

export async function postTweet() {
  let text = $("textarea").val();
  await axios({
    method: 'post',
    url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
    data: {
      "type": "tweet",
      "body": text,
    },
    withCredentials: true,
  });
  
  cancelDraft();
  renderHome();

}

export function edit(event){
  let data = event.target.getAttribute("data-text");
  $(`.edit${event.currentTarget.value}`).replaceWith(`
  <div class= "draft${event.currentTarget.value}" style = "position: relative;">
  <textarea class="edittext${event.currentTarget.value} textarea is-large">${data}</textarea>
  <button class = "canceledit${event.currentTarget.value} button has-text-white is-rounded has-background-info" style="position:absolute;bottom:2%;right:2%;" value = ${event.currentTarget.value} data-text=${event.target.getAttribute("data-text")}>Cancel</button>
  <button class = "submitedit${event.currentTarget.value} button has-text-white is-rounded has-background-info" style="position:absolute;bottom:2%;left:2%;" value = ${event.currentTarget.value}>Post</button>
  </div>`);
  
  $(`.canceledit${event.currentTarget.value}`).on("click", cancelEdit);
  $(`.submitedit${event.currentTarget.value}`).on("click", postEdit);



}

export async function postEdit(event) {
  let draft = $(`.edittext${event.currentTarget.value}`).val();
  await axios({
    method: 'put',
    url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + event.currentTarget.value,
    withCredentials: true,
    data: {
      "body": draft,
    },
  });
  renderHome();
}

export function cancelEdit(event) {
  $(`.draft${event.currentTarget.value}`).replaceWith(`<button class = "edit${event.currentTarget.value} button" value=${event.currentTarget.value} data-text=${event.currentTarget.getAttribute("data-text")}><i class="fas fa-edit"></i></button>`);
  $(`.edit${event.currentTarget.value}`).on("click", edit);
  
}

export async function deleteTweet(event) {
  await axios({
    method: 'delete',
    url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + event.currentTarget.value,
    withCredentials: true,
  });
  renderHome();
}

export async function likeTweet(event) {
 if ($(`#${event.currentTarget.id}`).hasClass("false")) {
  await axios({
    method: 'put',
    url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + event.currentTarget.id + '/like',
    withCredentials: true,
  });     
  renderHome();
 } else if ($(`#${event.currentTarget.id}`).hasClass("true")) {
  await axios({
    method: 'put',
    url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + event.currentTarget.id + '/unlike',
    withCredentials: true,
  });     
  renderHome();
  }
}

export function replyDraft(event) {
  $(event.target).replaceWith(`
  <div class= "replydraft${event.target.getAttribute("data-id")}" style = "position: relative;">
  <textarea class="replytext${event.target.getAttribute("data-id")} textarea is-large" placeholder="Post reply"></textarea>
  <button class = "cancelreply button has-text-white is-rounded has-background-info" style="position:absolute;bottom:2%;right:2%;" data-id =${event.target.getAttribute("data-id")}>Cancel</button>
  <button class = "submitreply button has-text-white is-rounded has-background-info" style="position:absolute;bottom:2%;left:2%;" data-id =${event.target.getAttribute("data-id")} author =${event.target.getAttribute("author")}>Post</button>
  </div>`);
  $(".cancelreply").on("click", cancelReply);
  $(".submitreply").on("click", postReply);
}

export function cancelReply(event) {
$(`.replydraft${event.target.getAttribute("data-id")}`).replaceWith(`
<i class="reply fas fa-reply" data-id=${event.target.getAttribute("data-id")} author=${event.target.getAttribute("author")}></i>
`);
$(".reply").on("click", replyDraft);

}

export async function postReply(event) {
  let author = event.target.getAttribute("author");
  let data = $(`.replytext${event.target.getAttribute("data-id")}`).val();
  await axios({
    method: 'post',
    url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
    withCredentials: true,
    data: {
      "type": "reply",
      "parent": event.target.getAttribute("data-id"),
      "body": data
    },
  });

  await axios({
    method: 'post',
    url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
    withCredentials: true,
    data: {
      "body": "Reply to " + author + ": " + data
    },
  });
  
  renderHome();

}

export function retweetDraft(){
  $(event.target).replaceWith(`
  <div class= "retweetdraft${event.target.getAttribute("data-id")}" style = "position: relative;">
  <textarea class="retweettext${event.target.getAttribute("data-id")} textarea is-large" placeholder="New retweet"></textarea>
  <button class = "cancelretweet button has-text-white is-rounded has-background-info" style="position:absolute;bottom:2%;right:2%;" data-id =${event.target.getAttribute("data-id")}>Cancel</button>
  <button class = "submitretweet button has-text-white is-rounded has-background-info" style="position:absolute;bottom:2%;left:2%;" data-id =${event.target.getAttribute("data-id")} author =${event.target.getAttribute("author")}>Post</button>
  </div>`);
  $(".cancelretweet").on("click", cancelRetweet);
  $(".submitretweet").on("click", postRetweet);

}

export function cancelRetweet(event){
$(`.retweetdraft${event.target.getAttribute("data-id")}`).replaceWith(`
<i class="retweet fas fa-retweet" data-id=${event.target.getAttribute("data-id")} author=${event.target.getAttribute("author")}></i>
`);
$(".retweet").on("click", retweetDraft);

}

export async function postRetweet(event) {
  const parent = await axios({
    method: "get",
    url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + event.target.getAttribute("data-id"),
    withCredentials: true,
  });

  let retweetbody = parent.data["body"];

  let retweettext = $(`.retweettext${event.target.getAttribute("data-id")}`).val();
  await axios({
    method: 'post',
    url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
    withCredentials: true,
    data: {
      "type": "retweet",
      "parent": event.target.getAttribute("data-id"),
      "body":
      `${retweettext}<br><br><div><h3>Retweeted from @${event.target.getAttribute("author")}:</h3><p>${retweetbody}</p></div>`
    },
  });

  renderHome();


}


$(function () {
    renderHome();
});
