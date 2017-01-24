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
            },

            countSongPlay: function() {
            $rootScope.songCount = $rootScope.songPlays.reduce(function(accumulator, currentValue) {

                var filterArray = accumulator.filter(function(iteratorValue) {
                    return currentValue.title === iteratorValue.title;
                });

                if (filterArray.length === 0) {
                    accumulator.push({
                        title: currentValue.title,
                        playCount: 1
                    });
                } else {
                    filterArray[0].playCount += 1;
                }

                return accumulator;
            }, []);
        }
      }
    };

    angular
        .module('blocJams')
        .service('SongMetrics', ['$rootScope', SongMetrics]);
})();
