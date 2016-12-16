(function() {
  function MetricCtrl(SongMetrics) {
    this.songMetrics = SongMetrics;
  }

  angular
    .module('blocJams')
    .controller('MetricCtrl', ['SongMetrics', MetricCtrl]);
})();
