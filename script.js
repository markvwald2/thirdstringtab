// Global state for scroll status
let isScrolling = false;
let isPaused = false;
let startDelay = null;
let currentActiveSong = null;

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById('sidebar');
    const toggleSidebarButton = document.getElementById('toggleSidebar');
    const content = document.getElementById('content');
    
    // Function to toggle the sidebar visibility
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

    // Function to update scroll status icon
    function updateScrollIcon() {
        if (!currentActiveSong) return;
        
        const scrollStatus = currentActiveSong.querySelector('.songScrollStatus');
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

    // Function to set active song
    function setActiveSong(songElement) {
        if (currentActiveSong) {
            currentActiveSong.classList.remove('active');
        }
        currentActiveSong = songElement;
        songElement.classList.add('active');
    }

    function searchData() {
        console.log("searchData triggered!");
        const query = searchBar.value.toLowerCase();
        bandListDiv.innerHTML = "";

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
                        const songDiv = document.createElement("div");
                        songDiv.className = 'song';
                        
                        const songText = document.createElement("span");
                        songText.textContent = song.text;
                        
                        const scrollStatus = document.createElement("span");
                        scrollStatus.className = 'songScrollStatus';
                        scrollStatus.innerHTML = '⏸︎';
                        
                        songDiv.appendChild(songText);
                        songDiv.appendChild(scrollStatus);
                        
                        songDiv.onclick = () => {
                            setActiveSong(songDiv);
                            displayTab(song.url, band.text, song.text);
                        };
                        songListDiv.appendChild(songDiv);
                    });
                } else {
                    songListDiv.style.display = "block";
                    matchingSongs.forEach((song) => {
                        const songDiv = document.createElement("div");
                        songDiv.className = 'song';
                        
                        const songText = document.createElement("span");
                        songText.textContent = song.text;
                        
                        const scrollStatus = document.createElement("span");
                        scrollStatus.className = 'songScrollStatus';
                        scrollStatus.innerHTML = '⏸︎';
                        
                        songDiv.appendChild(songText);
                        songDiv.appendChild(scrollStatus);
                        
                        songDiv.onclick = () => {
                            setActiveSong(songDiv);
                            displayTab(song.url, band.text, song.text);
                        };
                        songListDiv.appendChild(songDiv);
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
        
        // Update allSongs after rebuilding the list
        allSongs = Array.from(document.querySelectorAll(".song"));
    }

    function displayTab(url, bandName, songName) {
        console.log(`Fetching tab for: ${bandName} - ${songName}`);
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("Failed to load tab file.");
                return response.text();
            })
            .then(text => {
                tabDisplay.textContent = text;
                document.querySelector("h2").textContent = `${bandName} - ${songName}`;
                
                // Wait for the content to be rendered
                setTimeout(() => {
                    // Check if scrolling is needed
                    const contentHeight = content.scrollHeight;
                    const viewportHeight = window.innerHeight;
                    
                    if (contentHeight > viewportHeight) {
                        // Content is taller than viewport, enable scrolling
                        initAutoScroll();
                    } else {
                        // Content fits in viewport, don't enable scrolling
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
                }, 100); // Small delay to ensure content is rendered
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

        window.scrollTo(0, 0);
        isScrolling = true;
        isPaused = false;
        updateScrollIcon();

        // Start the delay timer
        startDelay = setTimeout(() => {
            // Check again if scrolling is needed (content might have changed)
            const contentHeight = content.scrollHeight;
            const viewportHeight = window.innerHeight;
            
            if (contentHeight > viewportHeight) {
                startScrolling(scrollSpeed);
            } else {
                isScrolling = false;
                updateScrollIcon();
            }
        }, delay);
    }

    function startScrolling(scrollSpeed) {
        const maxScroll = content.scrollHeight - window.innerHeight;
        let currentPosition = window.pageYOffset || document.documentElement.scrollTop;

        window.scrollInterval = setInterval(() => {
            if (!isPaused) {
                if (currentPosition >= maxScroll) {
                    clearInterval(window.scrollInterval);
                    isScrolling = false;
                    updateScrollIcon();
                    return;
                }
                
                currentPosition += scrollSpeed;
                window.scrollTo(0, currentPosition);
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

    // Initialize
    searchData();
});

// Store all songs when the page loads
let allSongs = [];

// Random song functionality
document.getElementById("randomSong").addEventListener("click", function () {
    if (allSongs.length === 0) return;

    const randomIndex = Math.floor(Math.random() * allSongs.length);
    const randomSong = allSongs[randomIndex];

    randomSong.click();
});