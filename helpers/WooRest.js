//import { serializeQuery, oathInfo, WPDomain, WPRepository, userActions, userReviews} from './WpBase';
import { kyFetch, serializeQuery, WPDomain, oathInfo } from './base';

export async function  getCategoryByID(id, payload) {
    let endpoint;
    if(payload){

        endpoint = `wp-json/wc/v3/products/categories/${id}?${serializeQuery(
            {
                ...oathInfo,
                ...payload
            }
        )}`;
    }else{
        endpoint = `wp-json/wc/v3/products/categories/${id}?${serializeQuery(
            {
                ...oathInfo
            }
        )}`;
    }

    const reponse = await WPRepository.get(`${WPDomain}/${endpoint}`)
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.log(JSON.stringify(error.message));
            return null;
        });
    return reponse;
}



export async function  getAttributeByID(id, payload) {
    let endpoint;
    if(payload){

        endpoint = `wp-json/wc/v3/products/attributes/${id}?${serializeQuery(
            {
                ...oathInfo,
                ...payload
            }
        )}`;
    }else{
        endpoint = `wp-json/wc/v3/products/attributes/${id}?${serializeQuery(
            {
                ...oathInfo
            }
        )}`;
    }

    const reponse = await WPRepository.get(`${WPDomain}/${endpoint}`)
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.log(JSON.stringify(error.message));
            return null;
        });
    return reponse;
}



export async function getProductCategories(payload) {
    let endpoint;
    if (payload) {
        endpoint = `wp-json/wc/v3/products/categories?${serializeQuery({
            ...payload,
            ...oathInfo,
        })}`;
    } else {
        endpoint = `wp-json/wc/v3/products/categories?${serializeQuery({
            ...oathInfo,
        })}`;
    }
    const reponse = await WPRepository.get(`${WPDomain}/${endpoint}`)
        .then((response) => {
            if (response.data && response.data.length > 0) {
                const data = {
                    items: response.data,
                    totalItems: response.headers['x-wp-total'],
                    totalPages: response.headers['x-wp-totalpages'],
                };
                return data;
            } else return null;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
}

export async function getAttributes(id, payload) {
    let endpoint;
    if(payload){
    endpoint = `wp-json/wc/v3/products/attributes/${id}/terms?${serializeQuery(
        {
            ...payload,
            ...oathInfo,
        }
    )}`;
    }else{
        endpoint = `wp-json/wc/v3/products/attributes/${id}/terms?${serializeQuery(
            {
                ...oathInfo
            }
        )}`;
    }
    return await WPRepository.get(`${WPDomain}/${endpoint}`)
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            return null;
        });
}

export function getWooTermsUrl (taxonomy, payload) {
    let endpoint;
    if(payload){
    endpoint = `wp-json/wc/v3/products/${taxonomy}?${serializeQuery(
        {
            ...payload,
            ...oathInfo,
        }
    )}`
    }else{
        endpoint = `wp-json/wc/v3/products/${taxonomy}?${serializeQuery(
            {
                ...oathInfo,
            }
        )}`
    }
    return `${WPDomain}/${endpoint}`;
}

export async function getWooTerms(taxonomy, payload) {
   
    return await WPRepository.get(getWooTermsUrl(taxonomy, payload))
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            return null;
        });
}

export function getVendorInfoUrl(payload){
    const endpoint = `wp-json/m-api/v1/vendor?${serializeQuery(
        payload
    )}`;
    return `${WPDomain}/${endpoint}`;
}

export async function getSlotAvailability(payload){
    return await WPRepository.get(`${WPDomain}/wp-json/m-api/v1/check_slot?${serializeQuery(
        payload
    )}`)
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            return null;
        });
}

export async function createBooking(payload){
    return await WPRepository.post(`${WPDomain}/wp-json/m-api/v1/create_booking?${serializeQuery(
        payload
    )}`)
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            return null;
        });
}

export async function getBookings(payload){
    let endpoint;

    if (payload) {
        endpoint = `wp-json/wc-bookings/v1/rest_bookings?${serializeQuery({
            ...payload,
            ...oathInfo,
        })}`;
    } else {
        endpoint = `wp-json/wc-bookings/v1/rest_bookings?${serializeQuery({
            ...oathInfo,
        })}`;
    }

    try{
        var res = kyFetch.get(`${WPDomain}/${endpoint}`).json();
        if(res){
            return res;
        }
    }catch{(e) => {
            return null;
        }}
}

export async function getVendorInfo(payload){
    const reponse = await WPRepository.get(getVendorInfoUrl(payload))
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            } else return null;
        })
        .catch((e) => {
            return e;
        });

    return reponse;
    
}


class WPProductRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async getProducts(payload) {
        let endpoint;
        if (payload) {
            endpoint = `wp-json/wc/v3/products?${serializeQuery({
                ...payload,
                ...oathInfo,
            })}`;
        } else {
            endpoint = 'wp-json/wc/v3/products';
        }
        const reponse = await WPRepository.get(`${WPDomain}/${endpoint}`)
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    const data = {
                        items: response.data,
                        totalItems: response.headers['x-wp-total'],
                        totalPages: response.headers['x-wp-totalpages'],
                    };
                    return data;
                } else return null;
            })
            .catch(() => {
                return null;
            });
        return reponse;
    }

    async getProductAttributes() {
        const endpoint = `wp-json/wc/v3/products/attributes?${serializeQuery({
            ...oathInfo,
        })}`;
        const reponse = await WPRepository.get(`${WPDomain}/${endpoint}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getBrands(payload) {
        const endpoint = `wp-json/wc/v3/products/attributes/4/terms?${serializeQuery(
            {
                ...payload,
                ...oathInfo,
            }
        )}`;
        return await WPRepository.get(`${WPDomain}/${endpoint}`)
            .then((response) => {
                return response.data;
            })
            .catch(() => {
                return null;
            });
    }
    async getAttributes(id, payload) {
        const endpoint = `wp-json/wc/v3/products/attributes/${id}/terms?${serializeQuery(
            {
                ...payload,
                ...oathInfo,
            }
        )}`;
        return await WPRepository.get(`${WPDomain}/${endpoint}`)
            .then((response) => {
                return response.data;
            })
            .catch(() => {
                return null;
            });
    }
    



    async getProductCategories(payload) {
        let endpoint;
        if (payload) {
            endpoint = `wp-json/wc/v3/products/categories?${serializeQuery({
                ...payload,
                ...oathInfo,
            })}`;
        } else {
            endpoint = `wp-json/wc/v3/products/categories?${serializeQuery({
                ...oathInfo,
            })}`;
        }
        const reponse = await WPRepository.get(`${WPDomain}/${endpoint}`)
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    const data = {
                        items: response.data,
                        totalItems: response.headers['x-wp-total'],
                        totalPages: response.headers['x-wp-totalpages'],
                    };
                    return data;
                } else return null;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductByID(payload) {
        const endpoint = `wp-json/wc/v3/products/${payload}?${serializeQuery({
            ...oathInfo,
        })}&_embed`;
        const reponse = await WPRepository.get(`${WPDomain}/${endpoint}`)
            .then((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error.message));
                return null;
            });
        return reponse;
    }

    async getProductVariantsByID(payload) {
        const endpoint = `wp-json/wc/v3/products/${payload}/variations?${serializeQuery(
            {
                ...oathInfo,
            }
        )}`;
        const reponse = await WPRepository.get(`${WPDomain}/${endpoint}`)
            .then((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error.message));
                return null;
            });
        return reponse;
    }

    async getRelatedProductByID(payload) {
        const endpoint = `wp-json/wc/v2/products/?include=${payload}?${serializeQuery(
            {
                ...oathInfo,
            }
        )}`;
        const reponse = await WPRepository.get(`${WPDomain}/${endpoint}`)
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getCategoryByID(payload) {
        const endpoint = `wp-json/wc/v3/products/categories/${payload}?${serializeQuery(
            {
                ...oathInfo,
            }
        )}`;
        const reponse = await WPRepository.get(`${WPDomain}/${endpoint}`)
            .then((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error.message));
                return null;
            });
        return reponse;
    }
}

export default new WPProductRepository();
