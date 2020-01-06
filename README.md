# Comp 426 twitter
A class-wide interactive Twitter-style news feed web app that displays a list of recent tweets and allows users to post new tweets to the feed, update or delete their tweets, retweet or reply to tweets, and like or unlike tweets. Stylized with Bulma and uses jQuery for DOM manipulation. Utilizes Axios to post/delete/update/retrieve tweets by interacting with a RESTful API server. This server has seven RESTful endpoints that HTTP requests were sent to.

1. GET     https://comp426fa19.cs.unc.edu/a09/tweets            :  Retrieves a list of the most recent Tweets as a JSON array
2. POST    https://comp426fa19.cs.unc.edu/a09/tweets            :  Creates a new tweet in the database
3. GET     https://comp426fa19.cs.unc.edu/a09/tweets/:id        :  Gets details about a specific Tweet
4. PUT     https://comp426fa19.cs.unc.edu/a09/tweets/:id        :  Updates a specific tweet
5. DELETE  https://comp426fa19.cs.unc.edu/a09/tweets/:id        :  Permanently deletes a specific Tweet
6. PUT     https://comp426fa19.cs.unc.edu/a09/tweets/:id/like   :  Likes a specific Tweet
7. PUT     https://comp426fa19.cs.unc.edu/a09/tweets/:id/unlike :  Unlikes a specific Tweet


Unfortunately since the backend was provided specifically for the purposes of the course, sending HTTP requests to the backend will no longer work, however, if you wish to take a look at the UI for the app, you can visit the link below. Refresh the page if tweets are not showing up.

# https://shayandolikhani.github.io/Comp-426-twitter/
