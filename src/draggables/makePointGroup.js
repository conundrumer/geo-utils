export default function makePointGroup (pointNames, groupName) {
  if (groupName) {
    return {
      get: function () {
        return pointNames.map((p) => this[groupName][p])
      },
      set: function (vals) {
        pointNames.forEach((p, i) => {
          this[groupName][p] = vals[i]
        })
      }
    }
  }
  return {
    get: function () {
      return pointNames.map((p) => this[p])
    },
    set: function (vals) {
      pointNames.forEach((p, i) => {
        this[p] = vals[i]
      })
    }
  }
}
