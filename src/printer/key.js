function toKey (data) {
  const newData = {
    _origin: data
  }

  // TODO
  Object.assign(newData, {
    '溯源码': data.food_security_code
  })

  return newData
}

export {
  toKey
}