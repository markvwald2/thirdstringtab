document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded!");

document.getElementById('toggleSidebar').addEventListener('click', function() {
	document.getElementById('sidebar').classList.toggle('hidden');
});

    const searchBar = document.getElementById("searchBar");
    const bandListDiv = document.getElementById("bandList");
    const tabDisplay = document.getElementById("tabDisplay");

    function searchData() {
        console.log("searchData triggered!");
        const query = searchBar.value.toLowerCase();
        bandListDiv.innerHTML = ""; // Clear current list

        data.forEach((band) => {
            const bandNameMatches = band.text.toLowerCase().includes(query);
            const matchingSongs = band.items.filter(song => song.text.toLowerCase().includes(query));

            if (bandNameMatches || matchingSongs.length > 0) {
                const bandDiv = document.createElement("div");
                bandDiv.classList.add("band");

                const arrow = document.createElement("span");
                arrow.classList.add("arrow");
                arrow.textContent = "▶"; // Right-pointing arrow

                const bandText = document.createElement("span");
                bandText.textContent = band.text;

                bandDiv.appendChild(arrow);
                bandDiv.appendChild(bandText);

                const songListDiv = document.createElement("div");
                songListDiv.classList.add("songList");
                songListDiv.style.display = "none"; // Songs hidden by default

                if (bandNameMatches) {
                    band.items.forEach((song) => {
                        const songDiv = document.createElement("div");
                        songDiv.classList.add("song");
                        songDiv.textContent = song.text;
                        songDiv.onclick = () => displayTab(song.url, band.text, song.text);
                        songListDiv.appendChild(songDiv);
                    });
                } else {
                    // If searching by song, only show matching songs under the band
                    songListDiv.style.display = "block";
                    matchingSongs.forEach((song) => {
                        const songDiv = document.createElement("div");
                        songDiv.classList.add("song");
                        songDiv.textContent = song.text;
                        songDiv.onclick = () => displayTab(song.url, band.text, song.text);
                        songListDiv.appendChild(songDiv);
                    });
                }

                // Toggle song visibility when clicking the band
                bandDiv.onclick = function () {
                    if (bandNameMatches) { // Only toggle when searching by band
                        const isExpanded = songListDiv.style.display === "block";
                        songListDiv.style.display = isExpanded ? "none" : "block";
                        arrow.textContent = isExpanded ? "▶" : "▼"; // Change arrow direction
                    }
                };

                bandListDiv.appendChild(bandDiv);
                bandListDiv.appendChild(songListDiv); // Ensure songs appear **under** band
            }
        });
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
            })
            .catch(error => {
                tabDisplay.textContent = "Error loading tab file.";
                console.error("Error:", error);
            });
    }

    searchBar.addEventListener("input", searchData);
    searchData(); // Load all bands initially
});
