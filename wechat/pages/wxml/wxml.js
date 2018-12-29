Page({
  data: {
    staffA: {
      firstName: 'Hulk',
      lastName: 'Hu'
    },
    staffB: {
      firstName: 'Shang',
      lastName: 'You'
    },
    staffC: {
      firstName: 'Gideon',
      lastName: 'Lin'
    },
    tempArr: [1, 2, 3, 4, 520],
    array:[1,2,3,4,4,12]
  },
  onLoad() {
    console.log(1);
    console.log({ ...this.data.staffA})
    console.log(1);
    console.log([...this.data.tempArr])
    console.log(1);

  }
})