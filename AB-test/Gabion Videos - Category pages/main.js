if ($('#full-product-details ul').hasClass('gallery-photo-list')) {
    $('#full-product-details ul').after('<h2>Videos</h2> <div id="video-grid" class="video-grid"></div>');
    const videos = [
        ['How to assemble a gabion', 'dnGKpb3vTN4'],
        ['How to use corner ties', 'UuBdKghZbGE'],
        ['How to use stone separating panels', 'b_rbPfSokqI'],
        ['Gabion deflection test', 'HtMjg0u6K1s'],
        ['How to assemble a gabion (WITH TYING WIRE)', 'QgbE9_i6oGU'],
        ['How to brace a gabion with tying wire', 'tnmcHhEuVPY'],
        ['How to make a gabion planter', 'tbaDfudKXU8']
    ];

    let isMobile = window.innerWidth <= 766;
    let isTablet = window.innerWidth > 767 && window.innerWidth <= 992;
    let initialDisplayCount = isMobile ? 3 : (isTablet ? 4 : 6);
    let displayedCount = 0;
    const gridContainer = $('#video-grid');

    function displayVideos(startIndex, endIndex) {
        for (let i = startIndex; i < endIndex; i++) {
            if (i >= videos.length) break;
            const [title, videoId] = videos[i];
            const thumbnailUrl = `https://i3.ytimg.com/vi/${videoId}/mqdefault.jpg`;
            const wrapper = $('<div>').addClass('video-wrappers').attr('data-video-id', videoId);
            const imgElement = $('<img>').attr('src', thumbnailUrl).attr('alt', `Video ${title}`);
            const playButton = $('<div>').addClass('play-button');
            const titleElement = $('<div>').addClass('video-title').text(title);

            wrapper.append(imgElement).append(playButton).append(titleElement);
            gridContainer.append(wrapper);
        }
        displayedCount = endIndex;
    }

    function removeVideos(startIndex, endIndex) {
        const videoWrappers = $('.video-wrappers');
        for (let i = startIndex; i < endIndex; i++) {
            if (i >= videoWrappers.length) break;
            videoWrappers.eq(i).remove();
        }
        displayedCount = startIndex;
    }

    function updateVideoDisplay() {
        isMobile = window.innerWidth <= 768;
        isTablet = window.innerWidth > 768 && window.innerWidth <= 992;
        initialDisplayCount = isMobile ? 3 : (isTablet ? 4 : 6);

        // Remove all current videos
        removeVideos(0, displayedCount);
        // Display the correct number of videos
        displayVideos(0, initialDisplayCount);

        if (videos.length > initialDisplayCount) {
            moreButton.show();
            lessButton.hide();
        } else {
            moreButton.hide();
            lessButton.hide();
        }
    }

    displayVideos(0, initialDisplayCount);

    const moreButton = $('<button>').text('More Videos').addClass('more-videos-button');
    const lessButton = $('<button>').text('Less Videos').addClass('less-videos-button').hide();
    gridContainer.after(moreButton).after(lessButton);

    moreButton.on('click', function() {
        displayVideos(displayedCount, displayedCount + initialDisplayCount);
        if (displayedCount >= videos.length) {
            moreButton.hide(); // Hide the button if all videos are displayed
            lessButton.show();
        }
    });

    lessButton.on('click', function() {
        removeVideos(initialDisplayCount, displayedCount);     
        moreButton.show();
        lessButton.hide(); // Hide the button if only the initial set of videos is displayed
    });

    // Add a resize event listener to handle screen size changes
    $(window).on('resize', function() {
        updateVideoDisplay();
    });
}

function video_modal(videoID) {
    const modalContent = `
        <div class='term-modal gallery-modal video-modal'>
            <div class='gallery-modal-content'>
                <span class='aira-close'>&times;</span>
                <div class='modal-image-container'>
                    <iframe width="800" height="450" src="https://www.youtube.com/embed/${videoID}?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div> 
    `;

    $('#footer').before(modalContent);

    $('.term-modal').show();
}

$(document).on('click', '.video-wrappers', function(event) {
    event.stopPropagation(); // Prevents the event from bubbling up to the parent elements
    let videoID = $(this).attr('data-video-id');
    video_modal(videoID); 
});