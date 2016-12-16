(function() {
  function SongMetrics($rootScope) {
    $rootScope.songPlays = [];

    return {
      //Function that stores a metric object by pushing it to the $rootScope array
      registerSongPlay: function(songObj) {
        //Add time to event register. Service recipe invokes a constructor with the new operator.
        songObj['playedAt']  = new Date();
        $rootScope.songPlays.push(songObj);
      },
      listSongsPlayed: function() {
        var songs = [];
        angular.forEach($rootScope.songPlays, function(song){
          songs.push(song.title);
        });
        return songs;
      }
    };
  }

  angular
    .module('blocJams')
    .service('SongMetrics', ['$rootScope', SongMetrics]);
})();
