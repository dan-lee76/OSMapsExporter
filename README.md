# OSMaps Data Scraper for Mapbox

A [Cloudflare Worker](https://developers.cloudflare.com/workers/) to scrape data from OSMaps and return checkpoint nodes, distance and elevation.

## Usage

```sh
curl https://example.com/?url=https://osmexporter.dan-lee1.workers.dev/?url=https://explore.osmaps.com/route/10378676/walks-of-a-lifetime-kinder-scout-circuit-peak-distric
```

Response:
```json
[[[-1.8164971,53.3650574],[-1.8167908,53.3666758],[-1.8155079,53.3679424],[-1.8158396,53.3694554],[-1.8169245,53.3705411],[-1.8243965,53.3704871],[-1.82661,53.3726229],[-1.8268264,53.3748704],[-1.8306581,53.3751456],[-1.8361326,53.3782543],[-1.8430348,53.3816792],[-1.845743,53.3810535],[-1.8495764,53.3810584],[-1.8534816,53.382052],[...],[-1.8162338,53.3651458]],28999.42460145489,902.9300000000005]
```

## Loading into mapbox
With your map loaded you can add a source, with the data
```js
map.addSource(walkId, {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': data[0]
                }
            }
        });
```

## Example Projects
[Loading into MapBox](https://github.com/dan-lee76/ramsoc/blob/master/themes/greenandgold/static/js/ramblinghiking_walks.js)

Example Endpoint: `https://osmexporter.dan-lee1.workers.dev/?url=https://explore.osmaps.com/route/10378676/walks-of-a-lifetime-kinder-scout-circuit-peak-distric`