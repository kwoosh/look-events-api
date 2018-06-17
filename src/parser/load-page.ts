import * as cheerio from 'cheerio'
import axios, { AxiosError } from 'axios'
import { buildURI, Tags } from './uri-builder'

export function loadPage(tags?: Tags): Promise<CheerioStatic | void> {
    return axios
        .get(buildURI(tags))
        .then(res => cheerio.load(res.data))
        .catch((err: AxiosError) => {
            if (err.response.status !== 404) console.error(err)
        })
}
