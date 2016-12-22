(function() {
    function SongMetrics($rootScope) {
        $rootScope.songPlays = [];
        $rootScope.songCount = [];

        return {
            //Function that stores a metric object by pushing it to the $rootScope array
            registerSongPlay: function(songObj) {
                //Add time to event register. Service recipe invokes a constructor with the new operator.
                songObj['playedAt'] = new Date();
                $rootScope.songPlays.push(songObj);

                $rootScope.songCount = $rootScope.songPlays.reduce(function(acc, cv) {
                    var arr = acc.filter(function(obj) {
                        return obj.title === cv.title;
                    });

                    if (arr.length === 0) {
                        acc.push({
                            title: cv.title,
                            playCount: 1
                        });
                    } else {
                        arr[0].playCount += 1;
                    }

                    return acc;
                }, []);
            }
        }
    };

    angular
        .module('blocJams')
        .service('SongMetrics', ['$rootScope', SongMetrics]);
})();
