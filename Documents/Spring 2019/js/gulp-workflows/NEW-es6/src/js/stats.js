/*function square(x) {
  return x * x;
}
function sum(array, callback) {
  if(callback) {
      array = array.map(callback);
  }
  return array.reduce((a,b) => a + b );
}
function variance(array) {
  return sum(array,square)/array.length - square(mean(array))
}
function mean(array) {
  return sum(array) / array.length;
}
export {
  variance,
  mean
}
*/

/*
const Stats = {
  square(x) {
    return x * x;
  },
  sum(array, callback) {
      if(callback) {
          array = array.map(callback);
      }
          return array.reduce((a,b) => a + b );
  },
  mean(array) {
      return this.sum(array) / array.length;
  },
  variance(array) {
      return this.sum(array,this.square)/array.length - this.square(this.mean(array)) }
}*/

const StatsRVM = (function() {
  "use strict";
  function square(x) {
    return x * x;
  }
  function sum(array, callback) {
    if (typeof callback === "function") {
      array = array.map(callback);
    }
    return array.reduce(function(a,b) { return a + b; });
  }
  function mean(array) {
    return sum(array) / array.length;
  }
  function sd(array) {
    return sum(array,square) / array.length - square(mean(array));
  }
  return {
    meanOfValues: mean,
    standardDeviation: sd
  };
}());

export default StatsRVM;