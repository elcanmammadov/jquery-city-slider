$(() => {
    const image = ['baku.webp', 'newyork.jpg', 'sinqapur.jpg', 'tokio.jpg', 'london.jpg', 'milan.jpg', 'sidney.jpg', 'amsterdam.jpg']
    const path = 'img/'
    const slider = $('#slider')
    let x = 0

    setInterval(change, 3000)

    slider
        .css({
            position: 'relative',
            background: `url('${path}${image[0]}') center/cover`
        })
        .html(`
            <div id="slide"></div>
            <div id="thumbs"></div>
            <div id="status"></div>
            <div id="progress"></div> <!-- yeni progress bar -->
        `)
        .click(function (e) {
            if (e.offsetX < $(this).width() / 2) change(-1)
            else change(1)
        })

    const slide = $('#slide')
    const thumbs = $('#thumbs')
    const status = $('#status')
    const progress = $('#progress')

    slide.css({
        width: '100%',
        height: '100%',
        background: `url('${path}${image[0]}') center/cover`
    })

    thumbs.css({
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, 0)'
    })

    status.css({
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: '#fff',
        color: '#000',
        padding: '5px 10px',
        borderRadius: '5px',
        fontFamily: 'Arial',
        fontSize: '14px',
        fontWeight: 'bold',
        boxShadow: '0 0 5px rgba(0,0,0,0.2)'
    }).text(`1/${image.length}`)

    progress.css({
        position: 'absolute',
        top: '0',
        left: '0',
        height: '4px',
        width: `${(x + 1) / image.length * 100}%`,
        background: '#fff',
        transition: 'width 1s ease'
    })

    image.forEach(img => thumbs.append(`<img src="${path}${img}" />`))
    thumbs.find('img')
        .css({
            width: '30px',
            height: '30px',
            border: '2px solid #fff',
            borderRadius: '50%',
            boxShadow: '0 0 10px #fff',
            margin: '5px',
            cursor: 'pointer'
        })
        .click(function () {
            x = $(this).index()
            change(0)
        })

    function change(dir = 1) {
        x += dir
        if (x < 0) x = image.length - 1
        if (x >= image.length) x = 0

        slide.hide(0, function () {
            $(this)
                .css({
                    backgroundImage: `url('${path}${image[x]}')`
                })
                .fadeIn(1000, function () {
                    slider.css({
                        backgroundImage: `url('${path}${image[x]}')`
                    })
                })
        })

        status.text(`${x + 1}/${image.length}`)


        progress.css({
            width: `${(x + 1) / image.length * 100}%`
        })
    }
})
