/*
In this exercise you will be provided with a LevelDB store that
contains over 2,000 tweets from @horse_js. Your job is to query
this data set for tweets that were made on a particular date.

Each entry is a single tweet. The key is the exact time that the
tweet was sent, in standard ISO date format (i.e. the format
generated by the Date object's `toISOString()` method.) The value
of the entry is simply a String representing the tweet's content.

Write a module (not a program) that exports a single function that
accepts three arguments: an instance of the levelup database, a date string, of
the form YYYY-MM-DD and a callback function.

The first argument to the callback should be an Error if one occurred
or null.

The second argument, if there was no error, should be an
array where each element is the String text of a tweet.

The array should contain ordered tweets for the single day given
as the first argument to your function. You must not return tweets
for any other day.

Your solution will be checked against the official solution to ensure
that your query is targeting the exact range (see details below).
The output will include the number of "streamed entries".
*/

module.exports = function (db, date, cb) {

  var tweets = []

  db.createReadStream({ start: date, end: date + '\xff' })
    .on('data', function (data) {
      tweets.push(data.value)
    })
    .on('end', function () {
      if(!cb) return
      cb(null, tweets)
      cb = null
    })
    .on('error', function (err) {
      if(!cb) return
      cb(err)
      cb = null
    })
}