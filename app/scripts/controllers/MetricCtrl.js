(function() {
    function MetricCtrl(SongMetrics, $scope) {
        this.songMetrics = SongMetrics;
        this.songCounts = this.songMetrics.countSongPlay();

        $scope.options = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 55
                },
                x: function(d) {
                    return d.title;
                },
                y: function(d) {
                    return d.playCount;
                },
                showValues: true,
                valueFormat: function(d) {
                    return d3.format(',.4f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: 30
                }
            }
        };
        $scope.data = [{
            key: "Cumulative Return",
            values: this.songCounts
        }];
    }

    angular
        .module('blocJams')
        .controller('MetricCtrl', ['SongMetrics', '$scope', MetricCtrl]);
})();
