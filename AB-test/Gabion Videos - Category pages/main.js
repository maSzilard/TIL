if ($('#full-product-details ul').hasClass('gallery-photo-list')) {
    $('#full-product-details ul').after('<h2>Videos</h2> <div id="video-grid" class="video-grid"></div>');
    const videos = [
        ['How to assemble a gabion', 'dnGKpb3vTN4'],
        ['How to use helicals', 'UuBdKghZbGE'],
        ['How to use tying wire', 'QgbE9_i6oGU'],
        ['How to use corner ties', 'UuBdKghZbGE'],
        ['How to use stone separating panels', 'b_rbPfSokqI'],
        ['Gabion deflection test', 'HtMjg0u6K1s'],
        ['How to assemble a gabion (WITH TYING WIRE)', 'QgbE9_i6oGU'],
        ['How to brace a gabion with tying wire', 'tnmcHhEuVPY'],
        ['How to make a gabion planter', 'tbaDfudKXU8']
    ];

    const gridContainer = $('#video-grid');

    videos.forEach(video => {
        const [title, videoId] = video;  // Renamed 'id' to 'videoId' here
        const thumbnailUrl = `https://i3.ytimg.com/vi/${videoId}/mqdefault.jpg`;
        const wrapper = $('<div>').addClass('video-wrappers').attr('data-video-id', videoId);
        const imgElement = $('<img>').attr('src', thumbnailUrl).attr('alt', `Video ${title}`);
        const playButton = $('<div>').addClass('play-button');
        const titleElement = $('<div>').addClass('video-title').text(title);

        wrapper.append(imgElement).append(playButton).append(titleElement);
        gridContainer.append(wrapper);
    });
}

$(document).on('click', '.video-wrappers', function(event) {
    event.stopPropagation(); // Prevents the event from bubbling up to the parent elements
	let videoID = $(this).attr('data-video-id');
    video_modal(videoID); 
});


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
