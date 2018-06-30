import axios, { AxiosError } from 'axios'
import { JSDOM } from 'jsdom'
import { buildURI, Params } from './uri-builder'

export function loadDOM(params?: Params): Promise<JSDOM | void> {
    return axios
        .get(buildURI(params))
        .then(res => new JSDOM(res.data))
        .catch((err: AxiosError) => {
            if (err.response.status !== 404) console.error(err)
        })
}
