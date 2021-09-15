import qs from 'qs'

export class ApiCall {

    defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    get = (url, params) => {
        let fetchUrl = url;
        if (params) {
            fetchUrl = url + '?' + qs.stringify(params);
        }
        return this.request('GET', fetchUrl);
    };

    request(method, url) {
        const options = {
            method,
            ...this.defaultOptions,
        }

        return fetch(url, options)
            .then(this.handleErrors)
            .then(res => {
                if (res.status === 204 || res.status === 201) {
                    return res
                }

                return res.json()
            })
            .catch((err) => {
                throw err
            })
    }

    async handleErrors(response) {
        if (response.ok) {
            return response
        }

        throw new Error(response.text)
    }

}