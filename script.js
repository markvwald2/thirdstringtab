// Global state
let isScrolling = false;
let isPaused = false;
let startDelay = null;
let currentActiveSong = null;
let allSongs = []; // Will store all songs
let displayedSongs = []; // Will store currently displayed/filtered songs

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById('sidebar');
    const toggleSidebarButton = document.getElementById('toggleSidebar');
    const content = document.getElementById('content');
    
    toggleSidebarButton.addEventListener('click', function() {
        sidebar.classList.toggle('hidden');
        content.classList.toggle('expanded');
        
        if (sidebar.classList.contains('hidden')) {
            toggleSidebarButton.style.right = '-40px';
        } else {
            toggleSidebarButton.style.right = '0';
        }
    });

    const searchBar = document.getElementById("searchBar");
    const bandListDiv = document.getElementById("bandList");
    const tabDisplay = document.getElementById("tabDisplay");

    // Function to initialize all songs
    function initializeAllSongs() {
        allSongs = [];
        data.forEach(band => {
            band.items.forEach(song => {
                allSongs.push({
                    bandName: band.text,
                    songName: song.text,
                    url: song.url
                });
            });
        });
    }

    function updateScrollIcon() {
        if (!currentActiveSong) return;
        
        const scrollStatus = document.getElementById('headerScrollStatus');
        if (!scrollStatus) return;
        
        if (!isScrolling) {
            scrollStatus.style.visibility = 'hidden';
            return;
        }
        
        scrollStatus.style.visibility = 'visible';
        
        if (!isPaused) {
            scrollStatus.innerHTML = '⏵︎';
            scrollStatus.title = 'Auto-scrolling (Press Space to Pause)';
        } else {
            scrollStatus.innerHTML = '⏸︎';
            scrollStatus.title = 'Paused (Press Space to Resume)';
        }
    }

    function setActiveSong(songElement) {
        if (currentActiveSong) {
            currentActiveSong.classList.remove('active');
        }
        currentActiveSong = songElement;
        songElement.classList.add('active');
    }

    function createSongDiv(bandName, song) {
        const songDiv = document.createElement("div");
        songDiv.className = 'song';
        songDiv.textContent = song.text;
        
        songDiv.onclick = () => {
            setActiveSong(songDiv);
            displayTab(song.url, bandName, song.text);
        };
        return songDiv;
    }

    function searchData() {
        const query = searchBar.value.toLowerCase();
        bandListDiv.innerHTML = "";
        displayedSongs = [];

        data.forEach((band) => {
            const bandNameMatches = band.text.toLowerCase().includes(query);
            const matchingSongs = band.items.filter(song => song.text.toLowerCase().includes(query));

            if (bandNameMatches || matchingSongs.length > 0) {
                const bandDiv = document.createElement("div");
                bandDiv.classList.add("band");

                const arrow = document.createElement("span");
                arrow.classList.add("arrow");
                arrow.textContent = "▶";

                const bandText = document.createElement("span");
                bandText.textContent = band.text;

                bandDiv.appendChild(arrow);
                bandDiv.appendChild(bandText);

                const songListDiv = document.createElement("div");
                songListDiv.classList.add("songList");
                songListDiv.style.display = "none";

                if (bandNameMatches) {
                    band.items.forEach((song) => {
                        const songDiv = createSongDiv(band.text, song);
                        songListDiv.appendChild(songDiv);
                        displayedSongs.push(songDiv);
                    });
                } else {
                    songListDiv.style.display = "block";
                    matchingSongs.forEach((song) => {
                        const songDiv = createSongDiv(band.text, song);
                        songListDiv.appendChild(songDiv);
                        displayedSongs.push(songDiv);
                    });
                }

                bandDiv.onclick = function () {
                    if (bandNameMatches) {
                        const isExpanded = songListDiv.style.display === "block";
                        songListDiv.style.display = isExpanded ? "none" : "block";
                        arrow.textContent = isExpanded ? "▶" : "▼";
                    }
                };

                bandListDiv.appendChild(bandDiv);
                bandListDiv.appendChild(songListDiv);
            }
        });
    }

    function displayTab(url, bandName, songName) {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("Failed to load tab file.");
                return response.text();
            })
            .then(text => {
                tabDisplay.textContent = text;
                document.querySelector("h2").textContent = `${bandName} - ${songName}`;
                
                setTimeout(() => {
                    const contentHeight = tabDisplay.scrollHeight;
                    const viewportHeight = tabDisplay.clientHeight;
                    
                    if (contentHeight > viewportHeight) {
                        initAutoScroll();
                    } else {
                        if (window.scrollInterval) {
                            clearInterval(window.scrollInterval);
                        }
                        if (startDelay) {
                            clearTimeout(startDelay);
                        }
                        isScrolling = false;
                        isPaused = false;
                        updateScrollIcon();
                    }
                }, 100);
            })
            .catch(error => {
                tabDisplay.textContent = "Error loading tab file.";
                console.error("Error:", error);
            });
    }

    function clearSearch() {
        document.getElementById('searchBar').value = '';
        searchData();
    }

    function initAutoScroll(delay = 10000, scrollSpeed = 0.5) {
        if (window.scrollInterval) {
            clearInterval(window.scrollInterval);
        }
        if (startDelay) {
            clearTimeout(startDelay);
        }

        tabDisplay.scrollTop = 0;
        isScrolling = true;
        isPaused = false;
        updateScrollIcon();

        startDelay = setTimeout(() => {
            const contentHeight = tabDisplay.scrollHeight;
            const viewportHeight = tabDisplay.clientHeight;
            
            if (contentHeight > viewportHeight) {
                startScrolling(scrollSpeed);
            } else {
                isScrolling = false;
                updateScrollIcon();
            }
        }, delay);
    }

    function startScrolling(scrollSpeed) {
        const maxScroll = tabDisplay.scrollHeight - tabDisplay.clientHeight;
        let currentPosition = tabDisplay.scrollTop;

        window.scrollInterval = setInterval(() => {
            if (!isPaused) {
                if (currentPosition >= maxScroll) {
                    clearInterval(window.scrollInterval);
                    isScrolling = false;
                    updateScrollIcon();
                    return;
                }
                
                currentPosition += scrollSpeed;
                tabDisplay.scrollTop = currentPosition;
            }
        }, 50);
    }

    // Event listeners
    searchBar.addEventListener("input", searchData);
    document.getElementById('clearSearch').addEventListener("click", clearSearch);
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && isScrolling) {
            e.preventDefault();
            isPaused = !isPaused;
            updateScrollIcon();
        }
    });

    document.addEventListener('wheel', () => {
        if (window.scrollInterval) {
            clearInterval(window.scrollInterval);
            isScrolling = false;
            updateScrollIcon();
        }
    });

    document.addEventListener('touchstart', () => {
        if (window.scrollInterval) {
            clearInterval(window.scrollInterval);
            isScrolling = false;
            updateScrollIcon();
        }
    });

    // Random song handler
    document.getElementById("randomSong").addEventListener("click", function () {
        if (allSongs.length === 0) return;

        const randomSong = allSongs[Math.floor(Math.random() * allSongs.length)];
        displayTab(randomSong.url, randomSong.bandName, randomSong.songName);
    });

    // Initialize
    initializeAllSongs();
    searchData();
});