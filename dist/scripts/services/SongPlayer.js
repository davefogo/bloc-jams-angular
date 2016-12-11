(function() {
    function SongPlayer($rootScope, Fixtures) {

        /*** PRIVATE ATTRIBUTES ***/

        /*
         * @desc Empty object
         * @type {Object}
         */
        var SongPlayer = {};

        /*
         * @desc Current Album being played
         * @type {Object}
         */
        var currentAlbum = Fixtures.getAlbum();

        /*
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null

        /*** PRIVATE FUNCTIONS ***/

        /*
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong();
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function(){
              $rootScope.$apply(function() {
                SongPlayer.currentTime = currentBuzzObject.getTime();
              });
            });

            SongPlayer.currentSong = song;
        };

        /*
         * @function playSong
         * @desc Enables songs to be played, paused and skipped.
         * @param {Object} song
         */
        function playSong(song) {
            currentBuzzObject.play();
            song.playing = true;
        }

        /*
         * @function stopSong
         * @desc Stops the current Buzz object ; Sets playing property of song to null
         * @param none
         */
        var stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }

        /*
         * @function getSongIndex
         * @desc Returns the current index of a song
         * @param {Object} song
         * @returns {Number} index
         */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        }

        /*** PUBLIC ATTRIBUTES ***/

        /*
         * @desc Active song object from list of songs
         * @type {Object}
         */
        SongPlayer.currentSong = null;

        /*
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         SongPlayer.currentTime = null;

        /*** PUBLIC METHODS ***/

        /*
         * @function SongPlayer.play
         * @desc Plays the song and sets a new value for currentSong
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        /*
         * @function SongPlayer.pause
         * @desc Pauses the currentSong
         * @param {Object} song
         */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /*
         * @function SongPlayer.previous
         * @desc Skips to the previous song
         * @param none
         */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        }

        /*
         * @function SongPlayer.next
         * @desc Skips to the next song
         * @param none
         */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex >= currentAlbum.length) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex]
                setSong(song);
                playSong(song);
            }
        }

        /*
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
          if (currentBuzzObject) {
            currentBuzzObject.setTime(time);
          }
        };

        return SongPlayer;

    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
