addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url)
    const params = url.searchParams
    const urlString = params.get('url')

    if (!urlString) {
        return new Response('null', { status: 400 })
    }

    const response = await fetch(urlString)
    const content = await response.text()

    const coordinatesData = getCoordinatesAfterWord(content)
    const distanceData = getDistance(content)
    const elevationData = getElevation(content)

    const result = `[${coordinatesData},${distanceData},${elevationData}]`
    const convertedCoords = coordinatesData.replace(/\]\[/g, ';')

    return new Response(result.toString(), {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    })
}

function getCoordinatesAfterWord(content) {
    const position = content.indexOf('"type":"LineString","coordinates":')
    if (position !== -1) {
        const start = position + '"type":"LineString","coordinates":'.length
        const end = content.indexOf(']]', start)
        return content.slice(start, end + 2).trim()
    }
    return ''
}

function getDistance(content) {
    const position = content.indexOf('"characteristics":{"distance":')
    if (position !== -1) {
        const start = position + '"characteristics":{"distance":'.length
        const end = content.indexOf(',', start)
        return content.slice(start, end).trim()
    }
    return ''
}

function getElevation(content) {
    const position = content.indexOf('"elevationAscent":')
    if (position !== -1) {
        const start = position + '"elevationAscent":'.length
        const end = content.indexOf(',', start)
        return content.slice(start, end).trim()
    }
    return ''
}
