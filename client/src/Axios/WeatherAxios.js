import axios from 'axios';


const api = {
  key: '60394b70ce82ffb4cbaba966ff1c0059',
  base: 'https://api.openweathermap.org/data/2.5'
}
const instance = axios.create({
  baseURL: api.base
});

instance.interceptors.request.use(
  config => {
    config.url += `&appid=${api.key}`

    return config
  }
)

export default instance;