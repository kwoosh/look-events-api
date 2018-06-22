import * as cheerio from 'cheerio'
import axios, { AxiosError } from 'axios'
import { buildURI, Params } from './uri-builder'

export function loadPage(params?: Params): Promise<CheerioStatic | void> {
    return axios
        .get(buildURI(params))
        .then(res => cheerio.load(res.data))
        .catch((err: AxiosError) => {
            if (err.response.status !== 404) console.error(err)
        })
}
