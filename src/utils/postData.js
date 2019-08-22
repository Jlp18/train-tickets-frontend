import { isEmpty } from 'lodash';

/**
 * use to set data into FormData
 * @param {*} datas
 * @return {*} formData
 */
export const postData = (datas) => {
  if (isEmpty(datas)) {
    return null
  }

  const formData = new FormData()
  const dataName = Object.keys(datas)

  dataName.map((name) => {
    formData.append(name, datas[name])
    return null
  })

  return formData
}

export const serialize = (pramas) => {
  pramas = pramas || {}
  var r = [];
  for (var p in pramas) {
      r.push(encodeURIComponent(p) + "=" + encodeURIComponent(pramas[p]));
  }
  return r.join("&");
}

